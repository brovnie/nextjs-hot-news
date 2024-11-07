import PostsList from '@/components/posts/PostsList';
import NewsForm from '../components/form/NewsForm';
export default function Home() {
  return (
    <div>
      <NewsForm />
      <PostsList />
    </div>
  );
}
