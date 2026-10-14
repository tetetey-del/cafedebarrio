import { z } from 'zod';

export const contactSchema = z.object({
  nombre: z.string().trim().min(1, 'Cuéntanos cómo te llamas.').max(100, 'El nombre no puede superar los 100 caracteres.'),
  email: z.string().trim().email('Introduce un email válido.').max(255, 'El email es demasiado largo.'),
  mensaje: z.string().trim().min(10, 'Escribe un mensaje de al menos 10 caracteres.').max(2000, 'El mensaje no puede superar los 2000 caracteres.'),
});

export type ContactInput = z.infer<typeof contactSchema>;
export const formatPrice = (price: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price);