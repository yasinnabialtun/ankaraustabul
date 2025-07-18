import { Link } from 'react-router-dom';
import { blogPosts } from '../data';

function Blog() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <div className="text-4xl text-gray-400">📝</div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>{post.author}</span>
                <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
              </div>
              <Link
                to={`/blog/${post.slug}`}
                className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Devamını Oku
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog; 