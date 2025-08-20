import { User } from '@/types/app';
import { createClient } from '@/utils/supabase/server';

const getUserData = async (): Promise<User | null> => {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.log('No user found', user);
        return null;
    }
    const {data,error} = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id);
    if (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
    return data? data[0] : null;
};

export default getUserData;