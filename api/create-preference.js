import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { orderNumber, total, customerName } = req.body;

    if (!total || Number(total) <= 0) {
      return res.status(400).json({ error: 'Monto inválido' });
    }

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: `Pedido GIANNIZI Imports #${orderNumber || ''}`,
            quantity: 1,
            unit_price: Number(total),
            currency_id: 'ARS',
          },
        ],
        payer: customerName ? { name: customerName } : undefined,
        external_reference: orderNumber || '',
        back_urls: {
          success: process.env.SITE_URL || 'https://giannizi.vercel.app',
          failure: process.env.SITE_URL || 'https://giannizi.vercel.app',
          pending: process.env.SITE_URL || 'https://giannizi.vercel.app',
        },
        auto_return: 'approved',
      },
    });

    return res.status(200).json({ init_point: result.init_point });
  } catch (error) {
    console.error('Error al crear preferencia de Mercado Pago:', error);
    return res.status(500).json({ error: 'No se pudo generar el link de pago' });
  }
}