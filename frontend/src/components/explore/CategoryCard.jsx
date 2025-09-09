// src/components/explore/CategoryCard.jsx
import CategoryIcon from "@mui/icons-material/Category";

export default function CategoryCard({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center min-w-[120px] h-24 rounded-lg border transition-colors
        ${selected ? "bg-violet-50 border-[#311B92]" : "bg-white border-gray-200 hover:border-[#311B92]"}`}
    >
      {/* Ícono (puedes cambiar por uno específico según el rubro) */}
      <CategoryIcon
        className={`${selected ? "text-[#311B92]" : "text-gray-600 group-hover:text-[#311B92]"}`}
      />
      <span
        className={`mt-2 text-xs text-center ${
          selected ? "text-[#311B92]" : "text-gray-600"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
