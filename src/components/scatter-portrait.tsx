"use client";

import React, { useEffect, useRef } from "react";

const VERTEX_SHADER = `
precision mediump float;
attribute vec4 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;
uniform float u_mouseActive;
uniform float u_mouseActivation; // Smooth activation factor
uniform vec2 u_laggedMouse;
uniform float u_time;

void main() {
  vec4 position = a_position;
  
  // Apply displacement effect based on mouse position when active
  if (u_mouseActive > 0.5) {
    // Convert normalized coordinates to screen space for displacement calculation
    vec2 screenPos = position.xy; // -1 to 1 range
    vec2 mouseScreenPos = vec2(
      (u_laggedMouse.x - 0.5) * 2.0,  // Convert 0-1 to -1 to 1 for X (using lagged mouse)
      (0.5 - u_laggedMouse.y) * 2.0   // Flip Y coordinate to match vertex coordinate system
    );
    
    // Calculate distance from vertex to mouse position
    float distanceToMouse = length(screenPos - mouseScreenPos);
    
    // Create displacement effect (vertices pushed away from mouse)
    float displacementRadius = 1.0; // How far the effect extends
    float displacementStrength = 0.03; // How strong the push is
    
    // Calculate displacement force with smooth falloff
    float influence = 0.5 / (1.0 + distanceToMouse * distanceToMouse * 2.0);
    
    // Add smooth radius falloff (smoothstep from full effect to zero at edge)
    float radiusFalloff = 1.0 - smoothstep(displacementRadius * 0.6, displacementRadius, distanceToMouse);
    
    // Calculate distance from edges (0 at edges, 1 at center)
    float edgeDistanceX = min(abs(screenPos.x), 1.0 - abs(screenPos.x)); // Distance from left/right edges
    float edgeDistanceY = min(abs(screenPos.y), 1.0 - abs(screenPos.y)); // Distance from top/bottom edges
    float edgeDistance = min(edgeDistanceX, edgeDistanceY); // Distance from closest edge
    
    // Edge falloff (no effect at edges, full effect away from edges)
    float edgeFalloff = edgeDistance > 0.05 ? smoothstep(0.05, 0.2, edgeDistance) : 0.0;
    // Combine all falloffs
    influence = influence * displacementStrength * radiusFalloff * edgeFalloff * u_mouseActivation;
    
    // Apply displacement (no hard cutoff needed now)
    if (influence > 0.001) { // Only apply if effect is meaningful
      // Push direction: away from mouse
      vec2 pushDirection = distanceToMouse > 0.01 ? normalize(screenPos - mouseScreenPos) : vec2(0.0);
      
      // Add some smoothing with time for organic feel
      float timeVariation = sin(u_time * 3.0 + distanceToMouse * 10.0) * 0.1 + 1.0;
      
      // Apply displacement
      position.xy += pushDirection * influence * timeVariation;
    }
  }
  
  gl_Position = position;
  v_texCoord = a_texCoord;
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_darkMode;
uniform vec2 u_mouseVelocity;
uniform float u_mouseActive;
uniform vec2 u_laggedMouse;
varying vec2 v_texCoord;

// Simple pseudo-random function
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 83758.5453123);
}

float randomBetween(float min, float max) {
  float rand = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898,78.233))) * 43758.5453123);
  return min + rand * (max - min);
}

void main() {
  // Use pixel coordinates for perfect grid alignment
  vec2 pixelCoord = v_texCoord * u_resolution;
  
  // Calculate mouse position in pixel coordinates
  vec2 mousePixel = u_laggedMouse * u_resolution;
  
  // Dot grid effect parameters (in pixels)
  float lightDotSizePixels = 2.7;
  float lightSpacingPixels = 5.8;
  float darkDotSizePixels = 2.5;
  float darkSpacingPixels = 5.3;
  float dotSizePixels = mix(lightDotSizePixels, darkDotSizePixels, u_darkMode);
  float spacingPixels = mix(lightSpacingPixels, darkSpacingPixels, u_darkMode);
  
  // Calculate how many grid cells fit in each dimension
  vec2 gridCount = floor(u_resolution / spacingPixels);
  
  // Calculate offset to center the grid
  vec2 gridOffset = (u_resolution - gridCount * spacingPixels) * 0.5;
  
  // Adjust pixel coordinates to center the grid
  vec2 adjustedPixelCoord = pixelCoord - gridOffset;
  
  // Calculate grid position in centered grid space (no displacement)
  vec2 originalGridPos = floor(adjustedPixelCoord / spacingPixels) * spacingPixels + spacingPixels * 0.5;
  vec2 gridPos = originalGridPos;
  vec2 offset = adjustedPixelCoord - gridPos;
  float dist = length(offset);
  
  // Sample texture from ORIGINAL position for dot color
  vec2 originalGridUV = (originalGridPos + gridOffset) / u_resolution;
  
  vec4 gridColor = vec4(0.95, 0.95, 0.95, 1.0);
  if (originalGridUV.x >= 0.0 && originalGridUV.x <= 1.0 && originalGridUV.y >= 0.0 && originalGridUV.y <= 1.0) {
    gridColor = texture2D(u_texture, originalGridUV);
  }
  
  // Calculate brightness of the original color
  float brightness = (gridColor.r + gridColor.g + gridColor.b) / 3.0;
  
  // Adjust dot size based on brightness (in pixels)
  float lightAdjustedDotSize = dotSizePixels * smoothstep(0.2, 0.8, (1.0 - brightness));
  // A faint dot even where the photo is dark, so the grid reads as a whole square.
  float darkAdjustedDotSize = dotSizePixels * mix(0.3, 1.0, smoothstep(0.15, 1.0, brightness));
  float baseDotSize = mix(lightAdjustedDotSize, darkAdjustedDotSize, u_darkMode);
  
  float adjustedDotSize = baseDotSize;
  
  // Only render dots that are within valid grid bounds
  float circle = 0.0;
  
  // Check if the original dot center is within valid grid bounds (before displacement)
  vec2 originalDotCenter = originalGridPos;
  vec2 adjustedOriginalDotCenter = originalDotCenter - gridOffset;
  if (adjustedOriginalDotCenter.x >= 0.0 && adjustedOriginalDotCenter.x < gridCount.x * spacingPixels &&
      adjustedOriginalDotCenter.y >= 0.0 && adjustedOriginalDotCenter.y < gridCount.y * spacingPixels) {
    circle = 1.0 - smoothstep(adjustedDotSize - 0.5, adjustedDotSize + 0.5, dist);
    
    // Calculate distance from closest edge
    float distFromLeftEdge = pixelCoord.x;
    float distFromRightEdge = u_resolution.x - pixelCoord.x;
    float distFromTopEdge = pixelCoord.y;
    float distFromBottomEdge = u_resolution.y - pixelCoord.y;
    
    float distFromEdge = min(min(distFromLeftEdge, distFromRightEdge), 
                            min(distFromTopEdge, distFromBottomEdge));
    
    // Add randomness based on distance from edge (use original position for consistency)
    vec2 gridCoord = floor((originalGridPos + gridOffset) / spacingPixels);
    
    // Define fade zone (in pixels) - use grid coordinate for consistent randomness per dot
    float fadeZoneSize = random(gridCoord + vec2(123.45, 678.90)) * u_resolution.y * 0.04;
    // Calculate fade factor (0 at edges, 1 inside fade zone)
    float edgeFactor = clamp(distFromEdge / fadeZoneSize, 0.0, 1.0);
    
    float edgeNoise = random(gridCoord);
    
    // Probability of showing dot increases with distance from edge
    float showProbability = edgeFactor * 0.4 + 0.6; // 60% at the very edge, all of them inside
    
    // Mouse-based hiding effect with lagged position
    vec2 dotCenter = originalGridPos + gridOffset;
    vec2 laggedMousePixel = u_laggedMouse * u_resolution;
    float mouseDistance = length(dotCenter - laggedMousePixel);
    
    // Calculate velocity-enhanced radius
    float velocityMagnitude = length(u_mouseVelocity);
    float baseRadius = 400.0; // Base influence radius
    float velocityRadius = velocityMagnitude * 20.0; // Velocity extends radius
    float totalRadius = baseRadius + velocityRadius;
    
    float mouseInfluence = 0.0;
    if (mouseDistance < totalRadius && u_mouseActive > 0.5) {
      mouseInfluence = 0.75 - (mouseDistance / totalRadius); // Linear falloff within radius
    }
    
    // Use dot position for consistent randomness
    vec2 mouseHideCoord = floor((originalGridPos + gridOffset) / spacingPixels);
    float mouseHideNoise = random(mouseHideCoord + vec2(9.87, 6.54));
    
    // Simplified temporary hiding - dots near mouse get hidden, then recover over time
    float baseHideProbability = mouseInfluence * 0.8 * u_mouseActive; // Base probability to hide near mouse
    float velocityBoost = min(velocityMagnitude * 2.0, 1.0); // Faster mouse = stronger effect
    
    // Add time-based recovery oscillation
    float impactSeed = random(mouseHideCoord + vec2(2.34, 7.89));
    float recoveryTime = 0.1 + impactSeed * 1.0; // 0.1-1.1 second recovery cycle
    float recoveryWave = sin(u_time / recoveryTime + impactSeed * 6.28) * 0.5 + 0.5; // 0-1 oscillation
    
    // Apply recovery - dots can recover even if mouse is still near
    float hideProbability = baseHideProbability * (1.0 + velocityBoost) * (1.0 - recoveryWave * 0.7);
    
    // Show/hide dot based on random threshold
    if (edgeNoise > showProbability) {
      circle = 0.0;
    } else {
      // Apply mouse-based fade out effect
      float mouseFadeOut = 1.0;
      if (mouseHideNoise < 0.5) {
        float sizeFactor = adjustedDotSize / dotSizePixels;
        float baseFadeDuration = 0.5;
        float sizeFadeDuration = baseFadeDuration + sizeFactor * 1.0;
        float fadeSpeed = mouseInfluence * 3.0;
        float fadeProgress = clamp(fadeSpeed - recoveryWave * 2.0, 0.0, 1.0);
        mouseFadeOut = 1.0 - smoothstep(0.0, sizeFadeDuration, fadeProgress * sizeFadeDuration);
      }
      
      circle *= mouseFadeOut;
      
      // Add fade-in animation with delay based on dot size
      float sizeBasedDelay = (adjustedDotSize / dotSizePixels) * 1.5;
      float randomOffset = random(gridCoord + vec2(456.78, 901.23)) * 0.75;
      float animationDelay = sizeBasedDelay + randomOffset;
      float animationDuration = 0.1;
      float animationStart = animationDelay;
      float animationEnd = animationDelay + animationDuration;
      
      float fadeIn = smoothstep(animationStart, animationEnd, u_time);
      circle *= fadeIn;
    }
  }
  
  // Choose dot color based on theme
  vec4 lightModeColor = vec4(0.0, 0.35, 0.53, 1.0); // sky-800
  vec4 darkModeColor = vec4(1.0, 1.0, 1.0, 1.0); // white
  vec4 dotColor = mix(lightModeColor, darkModeColor, u_darkMode);
  
  // Use premultiplied alpha to avoid fringing
  vec4 finalColor = vec4(dotColor.rgb * circle, circle);
  
  gl_FragColor = finalColor;
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertShader: WebGLShader,
  fragShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function loadTexture(gl: WebGLRenderingContext, url: string): WebGLTexture | null {
  const texture = gl.createTexture();
  if (!texture) return null;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Default 1x1 transparent pixel while loading
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 0, 0])
  );

  const image = new Image();
  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  };
  image.onerror = () => {
    console.error("Failed to load image texture:", url);
  };
  image.src = url;
  return texture;
}

interface ScatterPortraitProps {
  darkSrc?: string;
  lightSrc?: string;
  className?: string;
  darkMode?: boolean;
  width?: number;
  height?: number;
}

export function ScatterPortrait({
  darkSrc = "/portrait.jpg",
  lightSrc = "/portrait.jpg",
  className = "",
  darkMode,
  width = 472,
  height = 667,
}: ScatterPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const mouseActiveRef = useRef(0);
  const mouseActivationRef = useRef(0);
  const laggedMouseRef = useRef({ x: 0.5, y: 0.5 });
  const lastTimeRef = useRef(performance.now());
  const isDark = darkMode ?? true;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let targetW = width;
      let targetH = height;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          targetW = rect.width;
          targetH = rect.height;
        }
      }
      canvas.width = targetW * dpr * 1.3;
      canvas.height = targetH * dpr * 1.3;
      canvas.style.width = `${targetW}px`;
      canvas.style.height = `${targetH}px`;
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) {
      console.warn("WebGL not supported for scatter portrait");
      ro.disconnect();
      return;
    }

    gl.clearColor(0, 0, 0, 0);

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return;

    const program = createProgram(gl, vertShader, fragShader);
    if (!program) return;

    const aPos = gl.getAttribLocation(program, "a_position");
    const aTex = gl.getAttribLocation(program, "a_texCoord");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uDarkMode = gl.getUniformLocation(program, "u_darkMode");
    const uTexture = gl.getUniformLocation(program, "u_texture");
    const uMouseVelocity = gl.getUniformLocation(program, "u_mouseVelocity");
    const uMouseActive = gl.getUniformLocation(program, "u_mouseActive");
    const uMouseActivation = gl.getUniformLocation(program, "u_mouseActivation");
    const uLaggedMouse = gl.getUniformLocation(program, "u_laggedMouse");

    // Build 50x50 mesh geometry
    const positions: number[] = [];
    const texCoords: number[] = [];
    const indices: number[] = [];

    const segments = 50;
    for (let y = 0; y <= segments; y++) {
      for (let x = 0; x <= segments; x++) {
        const px = (x / segments) * 2 - 1;
        const py = (y / segments) * 2 - 1;
        positions.push(px, py);
        const tx = x / segments;
        const ty = 1 - y / segments;
        texCoords.push(tx, ty);
      }
    }

    for (let y = 0; y < segments; y++) {
      for (let x = 0; x < segments; x++) {
        const i = y * (segments + 1) + x;
        indices.push(i, i + 1, i + segments + 1);
        indices.push(i + 1, i + segments + 2, i + segments + 1);
      }
    }

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

    const idxBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    const numIndices = indices.length;
    const activeTexture = loadTexture(gl, isDark ? darkSrc : lightSrc);

    const render = (time: number) => {
      const smoothing = 0.15;
      laggedMouseRef.current = {
        x: laggedMouseRef.current.x + (mousePosRef.current.x - laggedMouseRef.current.x) * smoothing,
        y: laggedMouseRef.current.y + (mousePosRef.current.y - laggedMouseRef.current.y) * smoothing,
      };

      const targetAct = mouseActiveRef.current;
      mouseActivationRef.current += (targetAct - mouseActivationRef.current) * 0.06;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.enableVertexAttribArray(aPos);
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(aTex);
      gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
      gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, time * 0.001);
      gl.uniform1f(uDarkMode, isDark ? 1.0 : 0.0);
      gl.uniform2f(uMouseVelocity, mouseVelocityRef.current.x, mouseVelocityRef.current.y);
      gl.uniform1f(uMouseActive, mouseActiveRef.current);
      gl.uniform1f(uMouseActivation, mouseActivationRef.current);
      gl.uniform2f(uLaggedMouse, laggedMouseRef.current.x, laggedMouseRef.current.y);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, activeTexture);
      gl.uniform1i(uTexture, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuffer);
      gl.drawElements(gl.TRIANGLES, numIndices, gl.UNSIGNED_SHORT, 0);

      animFrameRef.current = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
      const now = performance.now();
      const dt = Math.max(now - lastTimeRef.current, 1);
      const dx = current.x - mousePosRef.current.x;
      const dy = current.y - mousePosRef.current.y;
      const factor = 0.1;
      const vx = (dx / dt) * 1000;
      const vy = (dy / dt) * 1000;

      mouseVelocityRef.current = {
        x: mouseVelocityRef.current.x * 0.9 + vx * factor,
        y: mouseVelocityRef.current.y * 0.9 + vy * factor,
      };

      if (mouseActiveRef.current === 0) {
        laggedMouseRef.current = { ...current };
      }
      mousePosRef.current = current;
      mouseActiveRef.current = 1;
      lastTimeRef.current = now;
    };

    const handleMouseLeave = () => {
      mousePosRef.current = { x: 0.5, y: 0.5 };
      mouseVelocityRef.current = { x: 0, y: 0 };
      mouseActiveRef.current = 0;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [darkSrc, lightSrc, isDark, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-coarse:pointer-events-none ${className}`}
      style={{ backgroundColor: "transparent", width: "100%", height: "100%", display: "block" }}
    />
  );
}

