import getUserData from '@/actions/getUserData';
import CreatorProfile from '../../components/youTop/top';
 
export default async function Home() {
  const userData = await getUserData();
  console.log(userData);

  return (
    <div >
      structure here based on userData test
      <CreatorProfile/>
    </div>
  );
}