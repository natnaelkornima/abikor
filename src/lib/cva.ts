export type VariantProps<T extends (...args: any) => any> = T extends (
  props?: infer P
) => any
  ? P
  : Record<string, never>;

export function cva<T extends Record<string, Record<string, string>>>(
  base: string,
  config?: {
    variants?: T;
    defaultVariants?: { [K in keyof T]?: keyof T[K] };
  }
) {
  return (props?: { [K in keyof T]?: keyof T[K] } & { className?: string }) => {
    let classes = base;
    if (config?.variants) {
      const defaults = config.defaultVariants || {};
      for (const [key, variantMap] of Object.entries(config.variants)) {
        const selected = (props as any)?.[key] ?? (defaults as any)?.[key];
        if (selected && variantMap[selected]) {
          classes += " " + variantMap[selected];
        }
      }
    }
    if (props?.className) {
      classes += " " + props.className;
    }
    return classes;
  };
}

