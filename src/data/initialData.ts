import { Product, BlogPost } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // Bazar
  {
    id: 'prod-1',
    code: 'GNZ-BAZ-01',
    name: '',
    category: 'Bazar',
    description: ' .',
    price: 14500,
    wholesalePrice: 10800,
    stock: 45,
    minStockAlert: 10,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    featured: true,
    specifications: ['Capacidad: 750ml', 'Material: Acero Inoxidable 304 libre de BPA', 'Pico rebatible con sorbete interno', 'Resistente a impactos']
  },
  {
    id: 'prod-2',
    code: 'GNZ-BAZ-02',
    name: 'Taza De Cerámica Importada Nórdica Con Cuchara',
    category: 'Bazar',
    description: 'Taza artesanal estilo escandinavo con detalle en relieve y cuchara de bambú incluida. Ideal para café, té o regalo corporativo.',
    price: 8900,
    wholesalePrice: 6500,
    stock: 28,
    minStockAlert: 8,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    badge: 'Nuevo',
    featured: true,
    specifications: ['Capacidad: 380ml', 'Apta para microondas y lavavajillas', 'Incluye cuchara ecológica']
  },
  {
    id: 'prod-3',
    code: 'GNZ-BAZ-03',
    name: 'Set De 3 Frascos Herméticos Con Tapa De Bambú',
    category: 'Bazar',
    description: 'Frascos de vidrio borosilicato de alta resistencia con tapa de bambú natural y sello de silicona hermético. Capacidad 500ml, 800ml y 1200ml.',
    price: 22400,
    wholesalePrice: 16900,
    stock: 14,
    minStockAlert: 5,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    badge: 'Oferta',
    featured: true,
    specifications: ['Vidrio borosilicato resistente', 'Tapa bambú ecológica', 'Cierre 100% hermético']
  },

  // Papelería & Oficina
  {
    id: 'prod-4',
    code: 'GNZ-PAP-01',
    name: 'Cuaderno Universitario A5 Tapa Dura Bullet Journal',
    category: 'Papelería',
    description: 'Cuaderno de diseño A5 con 120 hojas punteadas de 100g/m² (no traspasa la tinta). Tapa dura de cuerina suave con elástico de cierre, sobre interno y cinta marcadora.',
    price: 11200,
    wholesalePrice: 8200,
    stock: 62,
    minStockAlert: 15,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    badge: 'Más Vendido',
    featured: true,
    specifications: ['Formato A5 (15x21cm)', '120 Hojas Punteadas 100g', 'Apertura plana 180°', 'Bolsillo interno portapapeles']
  },
  {
    id: 'prod-5',
    code: 'GNZ-PAP-02',
    name: 'Set De Resaltadores Pastel Dual Tip (Pack x 8)',
    category: 'Papelería',
    description: 'Resaltadores de doble punta (punta biselada para subrayar y punta fina para caligrafía). Tinta al agua de secado rápido en tonos pastel suaves.',
    price: 7800,
    wholesalePrice: 5400,
    stock: 85,
    minStockAlert: 20,
    image: 'https://images.unsplash.com/photo-1585336261026-8f5786372969?auto=format&fit=crop&w=800&q=80',
    badge: 'Destacado',
    featured: true,
    specifications: ['8 Colores Pastel exclusivos', 'Doble punta versátil', 'Secado instantáneo sin manchas']
  },
  {
    id: 'prod-6',
    code: 'GNZ-OFI-01',
    name: 'Organizador De Escritorio Acrílico Transparente 4 Divisiones',
    category: 'Oficina',
    description: 'Organizador multifunción ideal para papelería, pinceles, maquillaje o cables. Diseño moderno de acrílico ultra claro y resistente.',
    price: 13900,
    wholesalePrice: 9900,
    stock: 19,
    minStockAlert: 5,
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80',
    badge: 'Nuevo',
    featured: false,
    specifications: ['Medidas: 22x12x10cm', 'Acrílico cristal de 3mm', '4 compartimentos escalonados']
  },

  // Hogar & Regalería
  {
    id: 'prod-7',
    code: 'GNZ-HOG-01',
    name: 'Lámpara LED De Escritorio Flex Touch Con Cargador USB',
    category: 'Hogar',
    description: 'Velador de estudio con brazo flexible 360°, 3 niveles de intensidad de luz (cálida, neutra y fría) y puerto USB para cargar tu celular.',
    price: 18900,
    wholesalePrice: 14200,
    stock: 22,
    minStockAlert: 6,
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80',
    badge: 'Destacado',
    featured: true,
    specifications: ['Control táctil gradual', '3 modos de temperatura de color', 'Batería recargable integrada', 'Salida USB 5V']
  },
  {
    id: 'prod-8',
    code: 'GNZ-REG-01',
    name: 'Humidificador Difusor De Aromas Ultrasónico Madera LED',
    category: 'Regalería',
    description: 'Difusor de aromaterapia silencioso con acabado símil madera y luces LED de 7 colores cambiantes. Función de apagado automático sin agua.',
    price: 16500,
    wholesalePrice: 12100,
    stock: 31,
    minStockAlert: 8,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    badge: 'Oferta',
    featured: true,
    specifications: ['Capacidad: 300ml', 'Tecnología ultrasónica 2.4MHz', 'Luz LED ambiental 7 tonos', 'Incluye cable USB']
  },

  // Novedades & Tecnología
  {
    id: 'prod-9',
    code: 'GNZ-NOV-01',
    name: 'Impresora Térmica Portátil Bluetooth Para Stickers & Notas',
    category: 'Novedades',
    description: 'Mini impresora térmica de bolsillo para imprimir fotos, listas de compras, memes o etiquetas sin necesidad de tinta. Conexión Bluetooth con app móvil gratuita.',
    price: 32900,
    wholesalePrice: 24500,
    stock: 4, // Low stock on purpose to test alert
    minStockAlert: 5,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
    badge: 'Mayorista',
    featured: true,
    specifications: ['Impresión térmica a 200 DPI', 'Compatible con iOS y Android', 'Incluye 1 rollo de papel térmico', 'Sin cartuchos de tinta']
  },
  {
    id: 'prod-10',
    code: 'GNZ-PAP-03',
    name: 'Set De Bolígrafos De Gel Borrabiles Kawaii (Pack x 6)',
    category: 'Papelería',
    description: 'Lapiceras de tinta termosensible que se borran con la goma de silicona incorporada en el extremo sin dañar el papel. Tinta azul suave 0.5mm.',
    price: 6400,
    wholesalePrice: 4500,
    stock: 40,
    minStockAlert: 10,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
    badge: 'Nuevo',
    featured: false,
    specifications: ['Grosor de trazo 0.5mm', 'Tinta borrables sin residuos', 'Diseños adorables surtidos']
  }
];

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
