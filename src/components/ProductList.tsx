import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ProductList() {
  const [productos, setProductos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarProductos = async () => {
    setCargando(true);
    const { data, error } = await supabase
      .from('Productos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setProductos(data);
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  if (cargando) return <p>Cargando productos...</p>;

  if (productos.length === 0) return <p>Todavía no hay productos cargados.</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
      {productos.map((producto) => (
        <div key={producto.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px' }}>
          {producto.imagen_url ? (
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px' }}
            />
          ) : (
            <div style={{ width: '100%', height: '160px', background: '#f0f0f0', borderRadius: '6px' }} />
          )}
          <h3>{producto.nombre}</h3>
          <p>${producto.precio}</p>
          <p>{producto.descripcion}</p>
        </div>
      ))}
    </div>
  );
}
