import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, firestore } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import './UploadProduct.css';

type ProductType = 'protein' | 'vegetable' | 'carbohydrate' | 'fat';
type MealType = 'desayuno' | 'almuerzo' | 'comida' | 'merienda' | 'cena';

interface ProductForm {
    name: string;
    type: ProductType;
    typeOfMeal: MealType[];
    link?: string;
    nutrition: {
        energia: number;
        grasas: number;
        grasasSaturadas: number;
        grasasInsaturadas: number;
        hidratosCarbono: number;
        azucares: number;
        proteinas: number;
    };
}

const UploadProduct = () => {
    const [dragActive, setDragActive] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [formData, setFormData] = useState<ProductForm>({
        name: '',
        type: 'protein',
        typeOfMeal: [],
        nutrition: {
            energia: 0,
            grasas: 0,
            grasasSaturadas: 0,
            grasasInsaturadas: 0,
            hidratosCarbono: 0,
            azucares: 0,
            proteinas: 0
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        if (file.type.startsWith('image/')) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setError('Por favor, sube solo imágenes');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            setError('Por favor, sube una imagen del producto');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Upload image to Firebase Storage
            const imageRef = ref(storage, `products/${Date.now()}_${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);

            // Save product data to Firestore
            await addDoc(collection(firestore, 'products'), {
                ...formData,
                image: imageUrl,
                createdAt: new Date()
            });

            navigate('/shop');
        } catch (err) {
            console.error('Error uploading product:', err);
            setError('Error al subir el producto');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-product-container">
            <h1>Subir Nuevo Producto</h1>

            <form onSubmit={handleSubmit} className="upload-form">
                {error && <div className="error-message">{error}</div>}

                <div
                    className={`drag-drop-area ${dragActive ? 'drag-active' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="file-input"
                    />

                    {preview ? (
                        <img src={preview} alt="Preview" className="image-preview" />
                    ) : (
                        <div className="upload-prompt">
                            <FontAwesomeIcon icon={faCloudUploadAlt} size="2x" />
                            <p>Arrastra una imagen o haz clic para seleccionar</p>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Nombre del Producto*</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Categoría*</label>
                    <select
                        id="type"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as ProductType })}
                        required
                    >
                        <option value="protein">Proteínas</option>
                        <option value="vegetable">Vegetales</option>
                        <option value="carbohydrate">Carbohidratos</option>
                        <option value="fat">Grasas Saludables</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Tipo de Comida*</label>
                    <div className="checkbox-group">
                        {['desayuno', 'almuerzo', 'comida', 'merienda', 'cena'].map((meal) => (
                            <label key={meal} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={formData.typeOfMeal.includes(meal as MealType)}
                                    onChange={(e) => {
                                        const updatedMeals = e.target.checked
                                            ? [...formData.typeOfMeal, meal as MealType]
                                            : formData.typeOfMeal.filter(m => m !== meal);
                                        setFormData({ ...formData, typeOfMeal: updatedMeals });
                                    }}
                                />
                                {meal.charAt(0).toUpperCase() + meal.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="link">Enlace de Compra (opcional)</label>
                    <input
                        type="url"
                        id="link"
                        value={formData.link || ''}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        placeholder="https://..."
                    />
                </div>

                <div className="nutrition-section">
                    <h3>Información Nutricional* (por 100g)</h3>
                    <div className="nutrition-grid">
                        {Object.entries(formData.nutrition).map(([key, value]) => {
                            const label = {
                                energia: 'Energía (kcal)',
                                grasas: 'Grasas (g)',
                                grasasSaturadas: 'Grasas Saturadas (g)',
                                grasasInsaturadas: 'Grasas Insaturadas (g)',
                                hidratosCarbono: 'Carbohidratos (g)',
                                azucares: 'Azúcares (g)',
                                proteinas: 'Proteínas (g)'
                            }[key];

                            return (
                                <div key={key} className="nutrition-input">
                                    <label htmlFor={key}>{label}</label>
                                    <input
                                        type="number"
                                        id={key}
                                        value={value}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            nutrition: {
                                                ...formData.nutrition,
                                                [key]: parseFloat(e.target.value) || 0
                                            }
                                        })}
                                        min="0"
                                        step="0.1"
                                        placeholder="0.0"
                                        required
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? 'Subiendo...' : 'Subir Producto'}
                </button>
            </form>
        </div>
    );
};

export default UploadProduct; 