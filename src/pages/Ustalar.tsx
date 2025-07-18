import UstaCard from '../components/UstaCard';
import { ustalar } from '../data';

function Ustalar() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Tüm Ustalar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ustalar.map((usta) => (
          <UstaCard key={usta.id} usta={usta} />
        ))}
      </div>
    </div>
  );
}

export default Ustalar; 