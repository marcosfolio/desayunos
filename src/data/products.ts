import panDextrinado from '../assets/images/pan_dextrinado.jpg';
import cremaCacahuete from '../assets/images/crema_cacahuete.jpg';

interface NutritionInfo {
    energia: number;
    grasas: number;
    grasasSaturadas: number;
    grasasInsaturadas: number;
    hidratosCarbono: number;
    azucares: number;
    proteinas: number;
}

interface Product {
    name: string;
    image: string;
    link: string;
    type: string;
    nutrition: NutritionInfo;
}

export const products: Product[] = [
    {
        name: "Pan dextrinado",
        image: panDextrinado,
        type: "carbohydrate",
        link: "https://www.amazon.es/Dextrin-Semillas-Lino-Santiveri-300/dp/B00DN9PEVA",
        nutrition: {
            energia: 1,
            grasas: 1,
            grasasSaturadas: 1,
            grasasInsaturadas: 1,
            hidratosCarbono: 1,
            azucares: 1,
            proteinas: 1
        }
    },
    {
        name: "Pan dextrinado",
        image: panDextrinado,
        type: "carbohydrate",
        link: "https://www.amazon.es/Dextrin-Semillas-Lino-Santiveri-300/dp/B00DN9PEVA",
        nutrition: {
            energia: 1,
            grasas: 1,
            grasasSaturadas: 1,
            grasasInsaturadas: 1,
            hidratosCarbono: 1,
            azucares: 1,
            proteinas: 1
        }
    },
    {
        name: "Crema cacahuete",
        image: cremaCacahuete,
        type: "protein",
        link: "https://www.amazon.es/Crema-cacahuete-Capit%C3%A1n-cacahuetes-tostados/dp/B08MW9VNH7",
        nutrition: {
            energia: 1,
            grasas: 1,
            grasasSaturadas: 1,
            grasasInsaturadas: 1,
            hidratosCarbono: 1,
            azucares: 1,
            proteinas: 1
        }
    }
]; 