import { motion } from 'framer-motion';

export const AnimalCard = ({ animal, onClick, showName = true, size = 'normal', className = '' }) => {
  // Styles exacts de la maquette
  const sizeClasses = size === 'large' ? 'w-48 h-48' : 'w-full aspect-square';
  const textClasses = size === 'large' ? 'text-8xl' : 'text-8xl'; // Toujours grand

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(animal)}
      className={`
        ${animal.color} 
        ${sizeClasses}
        rounded-[40px] 
        flex flex-col items-center justify-center 
        ${animal.shadow || 'shadow-xl'} 
        cursor-pointer 
        ${className}
      `}
    >
      <span className={`${textClasses} drop-shadow-sm`}>
        {animal.emoji}
      </span>
      
      {showName && (
        <span className="text-white text-3xl font-bold mt-4 drop-shadow-sm">
          {animal.name}
        </span>
      )}
    </motion.div>
  );
};