import { describe, expect, it } from 'vitest';
import { contactSchema, formatPrice } from '@/lib/cafe-schema';

const valid = { nombre: 'Ana', email: 'ana@example.com', mensaje: 'Me encanta vuestro café.' };
describe('Reglas de contacto', () => {
  it('requiere un nombre no vacío', () => { expect(contactSchema.safeParse({ ...valid, nombre: '   ' }).success).toBe(false); });
  it('requiere un email válido', () => { expect(contactSchema.safeParse({ ...valid, email: 'ana@' }).success).toBe(false); });
  it('requiere al menos diez caracteres en el mensaje', () => {
    expect(contactSchema.safeParse({ ...valid, mensaje: '123456789' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, mensaje: '1234567890' }).success).toBe(true);
  });
  it('acepta un mensaje válido y elimina espacios exteriores', () => { expect(contactSchema.parse({ ...valid, nombre: ' Ana ' }).nombre).toBe('Ana'); });
  it('limita el mensaje a 2000 caracteres', () => { expect(contactSchema.safeParse({ ...valid, mensaje: 'a'.repeat(2001) }).success).toBe(false); });
});
describe('Precios en español', () => {
  it.each([[1.4, '1,40'], [1.8, '1,80'], [2.2, '2,20'], [1.6, '1,60'], [2.5, '2,50'], [3.5, '3,50']])('formatea %s euros', (value, expected) => {
    expect(formatPrice(Number(value)).replace(/\s/g, ' ')).toBe(`${expected} €`);
  });
});