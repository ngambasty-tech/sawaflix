import getUserData from '@/actions/getUserData';

export default async function Home() {
  const userData = await getUserData();
  console.log(userData);

  return (
    <div >
      structure here based on userData
    </div>
  );
}