import { Product, BlogPost } from '../types';

export const INITIAL_PRODUCTS: Product[] = [];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Tendencias en Papelería y Bullet Journal para este Año',
    slug: 'tendencias-papeleria-bullet-journal',
    excerpt: 'Descubrí los artículos clave que no pueden faltar en tu escritorio: desde tonos pastel hasta planificadores inteligentes.',
    content: `La papelería creativa ha dejado de ser solo un insumo escolar u oficinesco para convertirse en una forma de expresión personal y organización consciente. En GIANNIZI Imports, como importadores directos, seleccionamos cuidadosamente los mejores insumos del mercado internacional.

### 1. El auge del Bullet Journal y Cuadernos Punteados
Los cuadernos A5 con hojas de 100g son la estrella indiscutida. Permitir el uso de marcadores al agua y acuarelas sin que la tinta traspase la hoja es un requisito indispensable para los fanáticos del journaling.

### 2. Paletas Pastel y Tonos Muted
Los resaltadores y bolígrafos fosforescentes chillones han cedido su lugar a tonos estéticos como salvia, malva, manteca y durazno suave. Facilitan lecturas prolongadas sin fatiga visual.

### 3. Organización Acrílica Transparente
Tener el escritorio despejado mejora la productividad. Los organizadores apilables de acrílico cristal permiten visualizar al instante tijeras, notas adhesivas y accesorios.

¿Querés abastecer tu negocio o renovar tu lugar de estudio? Explorá nuestro catálogo e interactuá con nuestros precios mayoristas directos.`,
    author: 'Equipo GIANNIZI Imports',
    date: '4 de Agosto, 2026',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    category: 'Papelería & Organización',
    tags: ['Papelería', 'BulletJournal', 'Oficina', 'Tendencias'],
    readTime: '3 min de lectura'
  },
  {
    id: 'post-2',
    title: 'Guía de Compras Mayoristas: Cómo Elevar la Rentabilidad de tu Bazar',
    slug: 'guia-compras-mayoristas-bazar',
    excerpt: 'Conocé las claves para armar un stock variado, de alta rotación y excelente margen de ganancia.',
    content: `Administrar una papelería o bazar requiere una estrategia de compras inteligente. En GIANNIZI Imports acompañamos a más de 500 comercios de todo el país en su crecimiento.

### Claves para elegir productos de alta rotación:
1. **Productos Multiuso:** Botellas térmicas, tazas de regalo y cuadernos son ítems que se venden durante los 12 meses del año.
2. **Novedades de Impulso:** Mini impresoras térmicas, bolígrafos kawaii y difusores LED generan ventas no planificadas en el mostrador.
3. **Calidad de Materiales:** Trabajar con acero inoxidable 304 y plásticos libres de BPA reduce devoluciones y fideliza clientes.

Aprovechá nuestro sistema de pedidos online con atención personalizada vía WhatsApp y envíos a transporte prioritario.`,
    author: 'Martín Giannizi - Depto. Comercial',
    date: '28 de Julio, 2026',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    category: 'Mayoristas & Negocios',
    tags: ['Mayorista', 'Bazar', 'Emprendedores', 'Consejos'],
    readTime: '5 min de lectura'
  },
  {
    id: 'post-3',
    title: '5 Elementos de Bazar que Transforman tu Cocina y Escritorio',
    slug: '5-elementos-bazar-hogar-escritorio',
    excerpt: 'Pequeños detalles de diseño nórdico que aportan orden, calidez y practicidad a tus espacios cotidianos.',
    content: `El diseño funcional está al alcance de todos. Te mostramos cómo cinco objetos simples de nuestro catálogo importado pueden renovar el look de tus ambientes cotidianos.

- **Frascos herméticos de vidrio y bambú:** Reemplazan plásticos y aportan armonía en alacenas.
- **Humidificadores ultrasónicos con luces LED:** Purifican el aire y perfuman tu espacio de trabajo.
- **Lámparas LED orientables:** Iluminación eficiente para largas jornadas de lectura.
- **Tazas cerámicas artesanales:** Transforman la pausa del café en un ritual reconfortante.`,
    author: 'Sofía R. - Diseñadora de Espacios',
    date: '15 de Julio, 2026',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    category: 'Hogar & Estilo',
    tags: ['Hogar', 'Bazar', 'Diseño', 'Decoración'],
    readTime: '4 min de lectura'
  }
];