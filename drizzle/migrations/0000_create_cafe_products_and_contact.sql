CREATE TABLE public.productos (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 nombre text NOT NULL CHECK (char_length(nombre) BETWEEN 1 AND 100),
 descripcion text NOT NULL CHECK (char_length(descripcion) BETWEEN 1 AND 400),
 precio numeric(8,2) NOT NULL CHECK (precio >= 0),
 categoria text NOT NULL CHECK (categoria IN ('bebida', 'comida'))
);
GRANT SELECT ON public.productos TO anon, authenticated;
GRANT ALL ON public.productos TO service_role;
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
CREATE POLICY productos_lectura_publica ON public.productos FOR SELECT TO anon, authenticated USING (true);
CREATE TABLE public.mensajes_contacto (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 nombre text NOT NULL CHECK (char_length(trim(nombre)) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) <= 255 AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 mensaje text NOT NULL CHECK (char_length(trim(mensaje)) BETWEEN 10 AND 2000),
 creado_en timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.mensajes_contacto TO anon, authenticated;
GRANT ALL ON public.mensajes_contacto TO service_role;
ALTER TABLE public.mensajes_contacto ENABLE ROW LEVEL SECURITY;
CREATE POLICY mensajes_insercion_publica ON public.mensajes_contacto FOR INSERT TO anon, authenticated WITH CHECK (char_length(trim(nombre)) BETWEEN 1 AND 100 AND char_length(trim(mensaje)) BETWEEN 10 AND 2000 AND char_length(email) <= 255);
INSERT INTO public.productos (nombre, descripcion, precio, categoria) VALUES
('Café solo', 'Intenso, aromático y recién molido. Nuestro pequeño gran ritual.', 1.40, 'bebida'),
('Café con leche', 'Nuestro espresso de siempre con leche cremosa, a tu gusto.', 1.80, 'bebida'),
('Cappuccino', 'Espresso, leche y una nube de espuma. El equilibrio perfecto.', 2.20, 'bebida'),
('Croissant', 'De mantequilla, crujiente por fuera y tierno por dentro.', 1.60, 'comida'),
('Tostada con tomate', 'Pan de masa madre, tomate natural y aceite de oliva virgen.', 2.50, 'comida'),
('Tarta de queso', 'Nuestra receta casera: suave, cremosa y hecha para repetir.', 3.50, 'comida');