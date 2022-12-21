export interface Settings {
  style: Style;
  classes?: Classes;
}
export interface Classes {
  complete?: string;
  focus?: string;
  invalid?: string;
  empty?: string;
}
export interface Style {
  base: Base;
}

export interface Base {
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  fontSmoothing?: string;
  fontVariant?: string;
  iconColor?: 'solid' | 'default';
  lineHeight?: string;
  letterSpacing?: string;
  textDecoration?: string;
}

export interface EventChangePanField {
  autofilled: boolean;
  brand: string;
  complete: boolean;
  empty: boolean;
  error?: ErrorPanField;
}

export interface ErrorPanField {
  code: number;
  message: string;
  param: string;
}

export interface Brand {
  brand: string;
}

