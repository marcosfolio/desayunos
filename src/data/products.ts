import panDextrinado from '../assets/images/pan_dextrinado.jpg';
import cremaCacahuete from '../assets/images/crema_cacahuete.jpg';

interface Product {
    name: string;
    image: string;
    link: string;
}

export const products: Product[] = [
    {
        name: "Pan dextrinado",
        image: panDextrinado,
        link: "https://www.amazon.es/Dextrin-Semillas-Lino-Santiveri-300/dp/B00DN9PEVA"
    },
    {
        name: "Pan dextrinado",
        image: panDextrinado,
        link: "https://www.amazon.es/Dextrin-Semillas-Lino-Santiveri-300/dp/B00DN9PEVA"
    },
    {
        name: "Crema cacahuete",
        image: cremaCacahuete,
        link: "https://www.amazon.es/Crema-cacahuete-Capit%C3%A1n-cacahuetes-tostados/dp/B08MW9VNH7"
    }
]; 