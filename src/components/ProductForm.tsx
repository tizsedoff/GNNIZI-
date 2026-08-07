import { useRef, useState } from 'react';
import { supabase } from '../supabaseClient';

interface ProductFormProps {
  onProductCreated?: (producto: any) => void;
}

export default function ProductForm({ onProductCreated }: ProductFormProps) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');
  const inputFileRef = useRef<HTMLInputElement>(null);

  const limpiarFormulario = () => {
    setNombre('');
    setPrecio('');
    setDescripcion('');
    setFoto(null);
    setPreviewUrl(null);
    if (inputFileRef.current) inputFileRef.current.value = '';
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files ? e.target.files[0] : null;
    setFoto(archivo);
    setPreviewUrl(archivo ? URL.createObjectURL(archivo) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nombre || !precio) {
      setError('Nombre y precio son obligatorios.');
      return;
    }

    setSubiendo(true);

    try {
      let imagenUrl = null;

      // 1. Si hay foto, subirla primero al bucket
      if (foto) {
        const nombreArchivo = `${Date.now()}-${foto.name}`;

        const { error: errorSubida } = await supabase.storage
          .from('productos-fotos')
          .upload(nombreArchivo, foto);

        if (errorSubida) throw errorSubida;

        // 2. Obtener la URL pública de la imagen recién subida
        const { data: urlData } = supabase.storage
          .from('productos-fotos')
          .getPublicUrl(nombreArchivo);

        imagenUrl = urlData.publicUrl;
      }

      // 3. Insertar el producto en la tabla, con la URL de la foto (si hay)
      const { data, error: errorInsert } = await supabase
        .from('Productos')
        .insert([
          {
            nombre,
            precio: parseFloat(precio),
            descripcion,
            imagen_url: imagenUrl,
          },
        ])
        .select();

      if (errorInsert) throw errorInsert;

      limpiarFormulario();
      if (onProductCreated) onProductCreated(data[0]);
    } catch (err) {
      console.error(err);
      setError('No se pudo guardar el producto. Probá de nuevo.');
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del producto</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Cuaderno tapa dura"
        />
      </div>

      <div>
        <label>Precio</label>
        <input
          type="number"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Ej: 2599.90"
        />
      </div>

      <div>
        <label>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Detalle breve del producto"
        />
      </div>

      <div>
        <label>Foto del producto</label>

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Vista previa"
            style={{
              display: 'block',
              width: '160px',
              height: '160px',
              objectFit: 'cover',
              borderRadius: '8px',
              margin: '8px 0',
            }}
          />
        )}

        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          onChange={handleFotoChange}
          style={{ display: 'none' }}
        />

        <button
          type="button"
          onClick={() => inputFileRef.current?.click()}
        >
          {foto ? 'Cambiar foto' : 'Elegir foto (galería o archivos)'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit" disabled={subiendo}>
        {subiendo ? 'Guardando...' : 'Guardar producto'}
      </button>
    </form>
  );
}
