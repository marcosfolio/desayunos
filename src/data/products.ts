import panDextrinadoLino from '../assets/images/pan_dextrinado_lino.jpg';
import panDextrinado from '../assets/images/pan_dextri.jpg';
import cremaCacahuete from '../assets/images/crema_cacahuete.jpg';
import panFibraSesamo from '../assets/images/pan_fibra_and_sesamo.jpg';
import pepinillosPequenos from '../assets/images/pepinillos_pequenos.jpg';
import brocoliMicrohondas from '../assets/images/brocoli.jpg';
import tomatesDulcita from '../assets/images/tomates_dulcita.jpg';
import yogurProteicoFresa from '../assets/images/yogur_proteico_fresa.jpg';
import cottageCheese from '../assets/images/cottage_cheese.jpg';
import clarasHuevo from '../assets/images/claras_huevo.jpg';
import nuecesNaturales from '../assets/images/nueces.jpg';
import lomoPavo from '../assets/images/lomo_de_pavo.jpg';
import guacamole from '../assets/images/guacamole.jpg';
import requeson from '../assets/images/requeson.jpg';
import atunClaroNatural from '../assets/images/atun_claro_al_natural.jpg';
import melvaAceiteOliva from '../assets/images/melva_aceite_oliva.jpg';
import rucula from '../assets/images/rucula.jpg';
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
        name: "Pan dextrinado con semillas de lino",
        image: panDextrinadoLino,
        type: "carbohydrate",
        link: "https://www.amazon.es/Dextrin-Semillas-Lino-Santiveri-300/dp/B00DN9PEVA",
        nutrition: {
            energia: 366,
            grasas: 5,
            grasasSaturadas: 0.6,
            grasasInsaturadas: 4.4,
            hidratosCarbono: 59,
            azucares: 2,
            proteinas: 15
        }
    },
    {
        name: "Pan dextrinado",
        image: panDextrinado,
        type: "carbohydrate",
        link: "https://www.amazon.es/SANTIVERI-Pan-Dextrin-Tradicional-Gramos/dp/B00DN9JXEY",
        nutrition: {
            energia: 366,
            grasas: 3.5,
            grasasSaturadas: 0.6,
            grasasInsaturadas: 2.9,
            hidratosCarbono: 62,
            azucares: 1.1,
            proteinas: 15
        }
    },
    {
        name: "Pan fibra y sésamo",
        image: panFibraSesamo,
        type: "carbohydrate",
        link: "https://tienda.mercadona.es/product/82655/pan-fibra-sesamo-hacendado-paquete",
        nutrition: {
            energia: 391,
            grasas: 7.6,
            grasasSaturadas: 1.1,
            grasasInsaturadas: 6.5,
            hidratosCarbono: 60.1,
            azucares: 3,
            proteinas: 13
        }
    },
    {
        name: "Pepinillos pequeños",
        image: pepinillosPequenos,
        type: "vegetable",
        link: "https://tienda.mercadona.es/product/29540/pepinillos-pequenos-hacendado-tarro",
        nutrition: {
            energia: 17,
            grasas: 0,
            grasasSaturadas: 0,
            grasasInsaturadas: 0,
            hidratosCarbono: 1.1,
            azucares: 0,
            proteinas: 1.5
        }
    },
    {
        name: "Rúcula",
        image: rucula,
        type: "vegetable",
        link: "https://tienda.mercadona.es/product/69753/rucula-paquete",
        nutrition: {
            energia: 26,
            grasas: 0,
            grasasSaturadas: 0,
            grasasInsaturadas: 0,
            hidratosCarbono: 0.8,
            azucares: 0.4,
            proteinas: 4.3
        }
    },
    {
        name: "Brócoli microhondas",
        image: brocoliMicrohondas,
        type: "vegetable",
        link: "https://tienda.mercadona.es/product/69622/floretas-brocoli-microondas-paquete",
        nutrition: {
            energia: 46,
            grasas: 0,
            grasasSaturadas: 0,
            grasasInsaturadas: 0,
            hidratosCarbono: 6.6,
            azucares: 1.7,
            proteinas: 2.8
        }
    },
    {
        name: "Tomates dulcita",
        image: tomatesDulcita,
        type: "vegetable",
        link: "https://tienda.mercadona.es/product/69622/floretas-brocoli-microondas-paquete",
        nutrition: {
            energia: 33,
            grasas: 0,
            grasasSaturadas: 0,
            grasasInsaturadas: 0,
            hidratosCarbono: 4.7,
            azucares: 4.6,
            proteinas: 1.4
        }
    },
    {
        name: "Yogur proteico fresa",
        image: yogurProteicoFresa,
        type: "protein",
        link: "https://tienda.mercadona.es/product/20996/postre-lacteo-con-fresa-proteinas-hacendado-0-mg-10-g-proteinas-pack-4",
        nutrition: {
            energia: 53,
            grasas: 0,
            grasasSaturadas: 0,
            grasasInsaturadas: 0,
            hidratosCarbono: 5,
            azucares: 4.6,
            proteinas: 8.3
        }
    },
    {
        name: "Lomo de pavo",
        image: lomoPavo,
        type: "protein",
        link: "https://tienda.mercadona.es/product/59138/lomo-pavo-hacendado-lonchas-pack-4",
        nutrition: {
            energia: 215,
            grasas: 5.8,
            grasasSaturadas: 2.8,
            grasasInsaturadas: 3,
            hidratosCarbono: 0.7,
            azucares: 0.7,
            proteinas: 40
        }
    },
    {
        name: "Atún claro al natural",
        image: atunClaroNatural,
        type: "protein",
        link: "https://tienda.mercadona.es/product/18018/atun-claro-natural-hacendado",
        nutrition: {
            energia: 79,
            grasas: 0.6,
            grasasSaturadas: 0.2,
            grasasInsaturadas: 3,
            hidratosCarbono: 0,
            azucares: 0,
            proteinas: 18
        }
    },
    {
        name: "Melva en aceite de oliva",
        image: melvaAceiteOliva,
        type: "protein",
        link: "https://tienda.mercadona.es/product/18107/filetes-melva-aceite-oliva-hacendado-lata",
        nutrition: {
            energia: 298,
            grasas: 24,
            grasasSaturadas: 4.2,
            grasasInsaturadas: 19.8,
            hidratosCarbono: 0,
            azucares: 0,
            proteinas: 21
        }
    },
    {
        name: "Cottage cheese",
        image: cottageCheese,
        type: "protein",
        link: "https://tienda.mercadona.es/product/60963/queso-fresco-cottage-semidesnatado-vaca-hacendado-tarrina",
        nutrition: {
            energia: 99,
            grasas: 4,
            grasasSaturadas: 2.6,
            grasasInsaturadas: 1.4,
            hidratosCarbono: 1.7,
            azucares: 1.7,
            proteinas: 14
        }
    },
    {
        name: "Requesón",
        image: requeson,
        type: "protein",
        link: "https://tienda.mercadona.es/product/51012/requeson-mezcla-montesinos-tarrina",
        nutrition: {
            energia: 160,
            grasas: 11.6,
            grasasSaturadas: 8.1,
            grasasInsaturadas: 3.5,
            hidratosCarbono: 5.4,
            azucares: 4.4,
            proteinas: 8.7
        }
    },
    {
        name: "Claras de huevo",
        image: clarasHuevo,
        type: "protein",
        link: "https://tienda.mercadona.es/product/31312/claras-huevo-liquidas-pasteurizadas-botella",
        nutrition: {
            energia: 42,
            grasas: 0,
            grasasSaturadas: 0,
            grasasInsaturadas: 0,
            hidratosCarbono: 0,
            azucares: 0,
            proteinas: 11
        }
    },
    {
        name: "Nueces naturales",
        image: nuecesNaturales,
        type: "fat",
        link: "https://tienda.mercadona.es/product/34024/nuez-natural-hacendado-pelada-paquete",
        nutrition: {
            energia: 716,
            grasas: 69.6,
            grasasSaturadas: 6,
            grasasInsaturadas: 63.6,
            hidratosCarbono: 2.2,
            azucares: 1.7,
            proteinas: 17
        }
    },
    {
        name: "Guacamole",
        image: guacamole,
        type: "fat",
        link: "https://tienda.mercadona.es/product/3840/guacamole-hacendado-95-aguacate-fresco-tarrina",
        nutrition: {
            energia: 149,
            grasas: 13.7,
            grasasSaturadas: 3.8,
            grasasInsaturadas: 9.9,
            hidratosCarbono: 2,
            azucares: 1.4,
            proteinas: 1.9
        }
    },
    {
        name: "Crema cacahuete",
        image: cremaCacahuete,
        type: "fat",
        link: "https://www.amazon.es/Crema-cacahuete-Capit%C3%A1n-cacahuetes-tostados/dp/B08MW9VNH7",
        nutrition: {
            energia: 587,
            grasas: 49.66,
            grasasSaturadas: 7.72,
            grasasInsaturadas: 41.94,
            hidratosCarbono: 21.26,
            azucares: 4.9,
            proteinas: 24.35
        }
    }
]; 