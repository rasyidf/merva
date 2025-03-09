import type { FieldRenderer, FieldType } from '../form-builder.types';

class FieldRegistry {
  private fields: Map<FieldType, FieldRenderer> = new Map();

  register<T extends FieldType>(type: T, renderer: FieldRenderer) {
    this.fields.set(type, renderer);
    return this;
  }

  get(type: FieldType): FieldRenderer | undefined {
    return this.fields.get(type);
  }

  getAll(): Record<FieldType, FieldRenderer> {
    return Object.fromEntries(this.fields.entries()) as Record<FieldType, FieldRenderer>;
  }
}

export const registry = new FieldRegistry();