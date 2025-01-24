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
import yogurGriegoNatural from '../assets/images/yogur_griego_natural.jpg';
import naranjas from '../assets/images/naranjas.jpg';
import manzanaGolden from '../assets/images/manzana_golden.jpg';
import pechugaPavoNoventaidos from '../assets/images/pechuga_de_pavo_92.jpg';
import quesoFrescoBatido from '../assets/images/queso_fresco_batido.jpg';
import salvadoAvena500 from '../assets/images/salvado_avena_500.jpg';
import pan100Integral from '../assets/images/pan_100_integral.jpg';
import pastaPenneRigateIntegral from '../assets/images/pasta_penne_rigate_integral.jpg';
import pinaNaturalRodajas from '../assets/images/pina_natural_rodajas.jpg';

interface NutritionInfo {
    energia: number;
    grasas: number;
    grasasSaturadas: number;
    grasasInsaturadas: number;
    hidratosCarbono: number;
    azucares: number;
    proteinas: number;
}

type TypeOfMeal = 'desayuno' | 'almuerzo' | 'comida' | 'merienda' | 'cena';

interface Product {
    name: string;
    image: string;
    link: string;
    type: string;
    typeOfMeal: TypeOfMeal[];
    nutrition: NutritionInfo;
}

export const products: Product[] = [
    {
        name: "Pan dextrinado con semillas de lino",
        image: panDextrinadoLino,
        type: "carbohydrate",
        link: "https://www.amazon.es/Dextrin-Semillas-Lino-Santiveri-300/dp/B00DN9PEVA",
        typeOfMeal: ['desayuno', 'almuerzo', 'merienda'],
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
        typeOfMeal: ['desayuno', 'almuerzo', 'merienda'],
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
        typeOfMeal: ['desayuno', 'almuerzo', 'merienda'],
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
        name: "Salvado de avena 500gr",
        image: salvadoAvena500,
        type: "carbohydrate",
        link: "https://www.amazon.es/INT-SALIM-SALVADO-AVENA-500-1/dp/B00DN9J1CI/ref=sr_1_3?dib=eyJ2IjoiMSJ9.9EKEgFXbbWYdGuu9Cv9q1eCobeS0TfV7k8Q7ajZnBK_0AXiYIHgSs3y7YYjSieZb4AgGRbyLWrW-b_rrZSz4tYoXr31VsxBpTQKAWXZvHOW-c0IcQZ8Lww5QENNAK01o05smV2KxUIwOZEgRgHZMCzwSnSHyOJPkkKlhuDvM2i2p58VUpk9GPK_C66xy83B22Auhsl_K4KDYmls8qTP2kb0HPdoWn6au9Kk5d-rG0Hdg8--41YCYxWgmNdJcYQviajDYcMk-jYxceGU7xWL61dXM0hGV6u_f2vl5icmPKEb2up93naEocinVdMuijC-Bx0VkJzYhJL6vrBcMUMIMSv47UAT3GJVSdURWzpyQO6b6putuk39h-jVOL3i867s9WWcTHcxXs3wSHD9SZh7xzoXDdW5vXxNnbVCkvu0Fcb85JpaGMpDbyH73GTwrskMi.-Jx-m_WvEmhvsJ53ZhiASfkqcTHwaxlSAJL85XzFh2k&dib_tag=se&keywords=salvado+de+avena&nsdOptOutParam=true&qid=1737461696&sr=8-3",
        typeOfMeal: ['desayuno'],
        nutrition: {
            energia: 355,
            grasas: 7.5,
            grasasSaturadas: 1.3,
            grasasInsaturadas: 6.2,
            hidratosCarbono: 47.6,
            azucares: 1.2,
            proteinas: 15.7
        }
    },
    {
        name: "Pan 100% integral",
        image: pan100Integral,
        type: "carbohydrate",
        link: "https://tienda.mercadona.es/product/60354/pan-integral-100-fino-paquete",
        typeOfMeal: ['desayuno', 'almuerzo', 'merienda'],
        nutrition: {
            energia: 223,
            grasas: 2.5,
            grasasSaturadas: 0.4,
            grasasInsaturadas: 2.1,
            hidratosCarbono: 38,
            azucares: 0.9,
            proteinas: 9.1
        }
    },
    {
        name: "Pasta penne rigate integral",
        image: pastaPenneRigateIntegral,
        type: "carbohydrate",
        link: "https://tienda.mercadona.es/product/35777/pasta-penne-integral-hacendado-paquete",
        typeOfMeal: ['comida', 'cena'],
        nutrition: {
            energia: 345,
            grasas: 2.4,
            grasasSaturadas: 0.5,
            grasasInsaturadas: 1.9,
            hidratosCarbono: 62,
            azucares: 3.7,
            proteinas: 13.5
        }
    },
    {
        name: "Pepinillos pequeños",
        image: pepinillosPequenos,
        type: "vegetable",
        link: "https://tienda.mercadona.es/product/29540/pepinillos-pequenos-hacendado-tarro",
        typeOfMeal: ['comida', 'cena'],
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
        typeOfMeal: ['comida', 'cena'],
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
        typeOfMeal: ['comida', 'cena'],
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
        typeOfMeal: ['desayuno', 'comida', 'cena'],
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
        name: "Naranjas",
        image: naranjas,
        type: "vegetable",
        link: "https://tienda.mercadona.es/product/3485/naranjas-malla",
        typeOfMeal: ['desayuno', 'almuerzo', 'merienda'],
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
        name: "Piña natural en rodajas",
        image: pinaNaturalRodajas,
        type: "vegetable",
        link: "https://tienda.mercadona.es/product/3024/pina-natural-rodajas-bote",
        typeOfMeal: ['desayuno', 'almuerzo', 'merienda'],
        nutrition: {
            energia: 58,
            grasas: 0,
            grasasSaturadas: 0,
            grasasInsaturadas: 0,
            hidratosCarbono: 14,
            azucares: 10,
            proteinas: 0.5
        }
    },
    {
        name: "Manzana golden",
        image: manzanaGolden,
        type: "vegetable",
        link: "https://tienda.mercadona.es/product/3485/naranjas-malla",
        typeOfMeal: ['desayuno', 'almuerzo', 'merienda'],
        nutrition: {
            energia: 50,
            grasas: 0,
            grasasSaturadas: 0,
            grasasInsaturadas: 0,
            hidratosCarbono: 13,
            azucares: 10,
            proteinas: 0.2
        }
    },
    {
        name: "Yogur proteico fresa",
        image: yogurProteicoFresa,
        type: "protein",
        link: "https://tienda.mercadona.es/product/20996/postre-lacteo-con-fresa-proteinas-hacendado-0-mg-10-g-proteinas-pack-4",
        typeOfMeal: ['almuerzo', 'merienda'],
        nutrition: {
            energia: 42,
            grasas: 0,
            grasasSaturadas: 0,
            grasasInsaturadas: 0,
            hidratosCarbono: 8.6,
            azucares: 8.6,
            proteinas: 0.8
        }
    },
    {
        name: "Yogur griego natural",
        image: yogurGriegoNatural,
        type: "protein",
        link: "https://tienda.mercadona.es/product/20512/yogur-griego-natural-hacendado-bote",
        typeOfMeal: ['desayuno', 'almuerzo', 'merienda'],
        nutrition: {
            energia: 129,
            grasas: 10.8,
            grasasSaturadas: 6.7,
            grasasInsaturadas: 4.1,
            hidratosCarbono: 3.9,
            azucares: 3.9,
            proteinas: 3.9
        }
    },
    {
        name: "Lomo de pavo",
        image: lomoPavo,
        type: "protein",
        link: "https://tienda.mercadona.es/product/59138/lomo-pavo-hacendado-lonchas-pack-4",
        typeOfMeal: ['almuerzo', 'merienda'],
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
        typeOfMeal: ['comida', 'cena'],
        nutrition: {
            energia: 79,
            grasas: 0.6,
            grasasSaturadas: 0.2,
            grasasInsaturadas: 0.4,
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
        typeOfMeal: ['comida', 'cena'],
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
        typeOfMeal: ['desayuno', 'almuerzo', 'merienda'],
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
        name: "Queso fresco batido",
        image: quesoFrescoBatido,
        type: "protein",
        link: "https://tienda.mercadona.es/product/51071/queso-fresco-batido-desnatado-0-mg-hacendado-tarrina",
        typeOfMeal: ['desayuno'],
        nutrition: {
            energia: 46,
            grasas: 0,
            grasasSaturadas: 0,
            grasasInsaturadas: 0,
            hidratosCarbono: 3.5,
            azucares: 3.5,
            proteinas: 8
        }
    },
    {
        name: "Requesón",
        image: requeson,
        type: "protein",
        link: "https://tienda.mercadona.es/product/51012/requeson-mezcla-montesinos-tarrina",
        typeOfMeal: ['desayuno', 'almuerzo', 'merienda'],
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
        typeOfMeal: ['desayuno'],
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
        name: "Pechuga de pavo 92%",
        image: pechugaPavoNoventaidos,
        type: "protein",
        link: "https://tienda.mercadona.es/product/5710/pechuga-pavo-92-hacendado-lonchas-paquete",
        typeOfMeal: ['desayuno', 'almuerzo', 'merienda'],
        nutrition: {
            energia: 89,
            grasas: 1.3,
            grasasSaturadas: 0.5,
            grasasInsaturadas: 0.7,
            hidratosCarbono: 0,
            azucares: 0,
            proteinas: 19.5
        }
    },
    {
        name: "Nueces naturales",
        image: nuecesNaturales,
        type: "fat",
        link: "https://tienda.mercadona.es/product/34024/nuez-natural-hacendado-pelada-paquete",
        typeOfMeal: ['almuerzo', 'merienda'],
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
        typeOfMeal: ['almuerzo', 'merienda'],
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
        typeOfMeal: ['almuerzo', 'merienda'],
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