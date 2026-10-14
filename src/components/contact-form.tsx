import { useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactSchema, type ContactInput } from '@/lib/cafe-schema';
import { sendContact } from '@/lib/cafe.functions';

export function ContactForm() {
  const send = useServerFn(sendContact);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map(issue => [issue.path[0], issue.message])));
      setStatus('idle');
      return;
    }
    setErrors({});
    setStatus('sending');
    try {
      const response = await send({ data: result.data });
      if (!response.ok) { setStatus('error'); return; }
      setStatus('success');
      form.reset();
    } catch { setStatus('error'); }
  }
  return <form onSubmit={submit} noValidate className="contact-form">
    <div className="form-row">
      <div className="form-field"><label htmlFor="nombre">Nombre</label><Input id="nombre" name="nombre" autoComplete="name" placeholder="Tu nombre" maxLength={100} required aria-invalid={!!errors.nombre} aria-describedby={errors.nombre ? 'nombre-error' : undefined}/>{errors.nombre && <span className="field-error" id="nombre-error">{errors.nombre}</span>}</div>
      <div className="form-field"><label htmlFor="email">Email</label><Input id="email" name="email" type="email" autoComplete="email" placeholder="tu@email.com" maxLength={255} required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}/>{errors.email && <span className="field-error" id="email-error">{errors.email}</span>}</div>
    </div>
    <div className="form-field"><label htmlFor="mensaje">Mensaje</label><Textarea id="mensaje" name="mensaje" placeholder="¿Qué te apetece contarnos?" rows={5} minLength={10} maxLength={2000} required aria-invalid={!!errors.mensaje} aria-describedby={errors.mensaje ? 'mensaje-error' : undefined}/>{errors.mensaje && <span className="field-error" id="mensaje-error">{errors.mensaje}</span>}</div>
    <div className="form-bottom"><span>Te leemos con un café en la mano.</span><Button type="submit" variant="cafe" size="lg" disabled={status === 'sending'}>{status === 'sending' ? <>Enviando <LoaderCircle className="animate-spin"/></> : <>Enviar mensaje <ArrowUpRight/></>}</Button></div>
    <div aria-live="polite">{status === 'success' && <p className="form-success" role="status"><CheckCircle2 size={20}/> ¡Mensaje recibido! Gracias por escribirnos. Te responderemos pronto.</p>}{status === 'error' && <p className="field-error" role="alert">No hemos podido enviar tu mensaje. Inténtalo de nuevo o llámanos al 910 123 456.</p>}</div>
  </form>;
}