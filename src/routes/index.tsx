import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { ArrowDown, ArrowRight, ArrowUpRight, Coffee, Heart, Leaf, MapPin, Clock3, Phone, Instagram, Facebook, Menu, X, Wheat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/contact-form';
import { getProducts } from '@/lib/cafe.functions';
import { formatPrice } from '@/lib/cafe-schema';
import hero from '@/assets/hero.jpg.asset.json';
import about from '@/assets/about.jpg.asset.json';
import solo from '@/assets/solo.jpg.asset.json';
import latte from '@/assets/latte.jpg.asset.json';
import cappuccino from '@/assets/cappuccino.jpg.asset.json';
import croissant from '@/assets/croissant.jpg.asset.json';
import toastPhoto from '@/assets/toast.jpg.asset.json';
import cake from '@/assets/cake.jpg.asset.json';

const productsQuery = queryOptions({ queryKey: ['productos'], queryFn: () => getProducts(), staleTime: 60_000 });
const productImages: Record<string, string> = { 'Café solo': solo.url, 'Café con leche': latte.url, 'Cappuccino': cappuccino.url, 'Croissant': croissant.url, 'Tostada con tomate': toastPhoto.url, 'Tarta de queso': cake.url };
const productOrder = ['Café solo', 'Café con leche', 'Cappuccino', 'Croissant', 'Tostada con tomate', 'Tarta de queso'];
const navigation = [['Inicio', '#inicio'], ['Carta', '#carta'], ['Nosotros', '#nosotros'], ['Contacto', '#contacto']];

export const Route = createFileRoute('/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQuery),
  head: () => ({ meta: [
    { title: 'Café del Barrio · Tu café de siempre' },
    { name: 'description', content: 'Granos recién tostados, repostería casera y buen ambiente. Descubre la carta de Café del Barrio y ven a conocernos.' },
    { property: 'og:title', content: 'Café del Barrio · Tu café de siempre' },
    { property: 'og:description', content: 'Un café sin prisa, algo rico y un lugar donde sentirte como en casa. Consulta nuestra carta, horario y ubicación.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: CafePage,
});

function CafePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('todos');
  const { data } = useSuspenseQuery(productsQuery);
  const products = [...data.products].sort((a, b) => productOrder.indexOf(a.nombre) - productOrder.indexOf(b.nombre)).filter(product => filter === 'todos' || product.categoria === filter);
  return <>
    <header className="site-header"><div className="header-inner">
      <a href="#inicio" className="wordmark" aria-label="Café del Barrio, inicio"><Coffee strokeWidth={1.6}/><span>Café del Barrio<span className="wordmark-dot">.</span></span></a>
      <nav className="desktop-nav" aria-label="Navegación principal">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <Button variant="cafe" asChild className="visit-button"><a href="#ubicacion">Ven a vernos <ArrowUpRight/></a></Button>
      <Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</Button>
    </div>{menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Navegación móvil">{navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}</header>
    <main>
      <section id="inicio" className="hero">
        <img src={hero.url} alt="Un rincón acogedor de cafetería, con mesas de madera, plantas y luz natural" width="1800" height="1200" fetchPriority="high" className="hero-image"/>
        <div className="hero-shade"/>
        <div className="container hero-content"><span className="hero-eyebrow"><span/> LAS COSAS BUENAS, CERCA DE CASA</span><h1>Tu café de barrio<br/>de <em>siempre.</em></h1><p>Granos recién tostados, repostería casera<br className="desktop-break"/> y buen ambiente</p><Button variant="cream" size="lg" asChild><a href="#carta">Ver la carta <ArrowUpRight/></a></Button><a href="#nosotros" className="hero-discover"><ArrowDown size={15}/> Un lugar para quedarse</a></div>
        <div className="hero-stamp"><Coffee strokeWidth={1.3}/><span>BUEN CAFÉ<br/>BUENA COMPAÑÍA</span><span className="stamp-small">HECHO CON CARIÑO</span></div>
        <div className="hero-location"><MapPin size={14}/> Tu rincón en Chamberí, Madrid</div>
      </section>
      <div className="values-strip"><div className="container values-inner"><span><Coffee/> Café recién tostado</span><i/><span><Wheat/> Repostería de nuestra cocina</span><i/><span><Heart/> De aquí, de tu barrio</span><i/><span><Leaf/> Pequeños momentos, sin prisa</span></div></div>
      <section id="carta" className="menu-section section-space"><div className="container">
        <div className="section-heading"><div><span className="eyebrow">SENCILLO. CASERO. MUY NUESTRO.</span><h2>Nuestra carta<span className="accent-dot">.</span></h2></div><p>Tu pausa favorita empieza aquí.<br/>Un buen café y algo rico para acompañar.</p></div>
        <div className="menu-tabs" role="group" aria-label="Filtrar la carta">{([['todos', 'Un poco de todo'], ['bebida', 'Nuestros cafés'], ['comida', 'Para acompañar']] as const).map(([value, label]) => <Button key={value} variant="ghost" className={`menu-tab ${filter === value ? 'selected' : ''}`} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</Button>)}</div>
        {data.error && <p role="alert" className="field-error">{data.error}</p>}
        <div className="product-grid">{products.map(product => <article className="product-card" key={product.id}><div className="product-photo"><img src={productImages[product.nombre] ?? croissant.url} alt={product.nombre} width="640" height="440" loading="lazy" decoding="async"/><span className="product-category">{product.categoria === 'bebida' ? 'CAFÉ' : 'HECHO EN CASA'}</span></div><div className="product-info"><div className="product-title"><h3>{product.nombre}</h3><span>{formatPrice(Number(product.precio))}</span></div><p>{product.descripcion}</p></div></article>)}</div>
        <p className="menu-note"><Leaf size={15}/> Lo bueno no necesita complicaciones. Pregúntanos por las opciones vegetales y los alérgenos.</p>
      </div></section>
      <section id="nosotros" className="about-section"><div className="container about-grid"><div className="about-photo"><img src={about.url} alt="Mesas y sillones de una cafetería de barrio iluminada por lámparas cálidas" width="1000" height="850" loading="lazy" decoding="async"/><div className="photo-caption"><Heart size={17}/> Un poquito de casa, fuera de casa.</div></div><div className="about-copy"><span className="eyebrow">MUCHO MÁS QUE UNA TAZA</span><h2>El café es la excusa.<br/><em>El barrio, lo importante.</em></h2><p>Hay lugares a los que vuelves por el café. Y otros, por cómo te hacen sentir. Nos gusta pensar que somos un poquito de los dos.</p><p>En Café del Barrio encendemos la cafetera cada mañana con la misma idea: hacer las cosas bien, aprendernos tu nombre y tener siempre algo recién hecho esperándote.</p><p>Para el desayuno de siempre, una charla improvisada o ese ratito que es solo tuyo. Aquí tienes tu mesa.</p><span className="about-signoff">Nos vemos en el café <Heart size={17}/></span></div></div></section>
      <section id="ubicacion" className="location-section section-space"><div className="container"><div className="section-heading"><div><span className="eyebrow">NOS GUSTA TENERTE CERCA</span><h2>Horario y ubicación<span className="accent-dot">.</span></h2></div><p>En la esquina de siempre.<br/>Con la puerta abierta y el café a punto.</p></div><div className="location-grid"><div className="location-details"><div className="detail-heading"><Clock3 size={19}/><h3>Siempre hay un buen momento</h3></div><dl className="hours"><div><dt>Lunes a viernes</dt><dd>7:30 – 20:00</dd></div><div><dt>Sábados</dt><dd>8:30 – 21:00</dd></div><div><dt>Domingos</dt><dd>9:00 – 15:00</dd></div></dl><div className="address-block"><MapPin size={20}/><div><h3>En el corazón de Chamberí</h3><p>Calle de la Buena Vecindad, 12<br/>28010 Madrid</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Chamber%C3%AD%2C%20Madrid" target="_blank" rel="noreferrer">Cómo llegar <ArrowUpRight size={15}/></a></div></div></div><div className="map-wrap"><iframe title="Mapa de Chamberí, Madrid; zona de referencia del local ficticio" src="https://maps.google.com/maps?q=Chamber%C3%AD%2C%20Madrid&t=&z=15&ie=UTF8&iwloc=&output=embed" width="700" height="350" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/><span className="map-caption">Chamberí, Madrid · Ubicación orientativa</span></div></div></div></section>
      <section id="contacto" className="contact-section"><div className="container contact-grid"><div className="contact-copy"><span className="eyebrow">LAS BUENAS CHARLAS EMPIEZAN CON UN HOLA</span><h2>¿Nos tomamos<br/>un café?</h2><p>Una pregunta, una sugerencia o simplemente un saludo. Nos encantará saber de ti.</p><a href="tel:+34910123456" className="contact-phone"><Phone size={17}/> 910 123 456 <ArrowUpRight size={16}/></a></div><ContactForm/></div></section>
    </main>
    <footer className="site-footer"><div className="container"><div className="footer-top"><a href="#inicio" className="wordmark"><Coffee strokeWidth={1.5}/><span>Café del Barrio.</span></a><p>El de siempre. El tuyo.</p><div className="social-links"><a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram size={19}/></a><a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noreferrer"><Facebook size={19}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Café del Barrio</span><span>Calle de la Buena Vecindad, 12 · Madrid · <a href="tel:+34910123456">910 123 456</a></span><span>Hecho con café y cariño <Heart size={12}/></span></div><p className="demo-note">Proyecto de prueba. Local, dirección y teléfono ficticios. Las redes enlazan a sus páginas generales.</p></div></footer>
  </>;
}