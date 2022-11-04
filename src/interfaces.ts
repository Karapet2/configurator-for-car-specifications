export interface SpecificationItem {
  id: number,
  label: string,
  type: string,
  field: string,
  placeholder?: string,
  required: boolean,
}

export interface SpecificationValidation {
  id: object,
  label: object,
  type: object,
  field: object,
  placeholder?: object,
  required: object,
}

export interface ConfigurationItem {
  label: string,
  type: string,
  field: string,
  placeholder?: string,
  options?: any, // string|Array<string>,
  required?: boolean,
}
