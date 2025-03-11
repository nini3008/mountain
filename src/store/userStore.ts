import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface UserState {
  user: any | null;
  profile: any | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  profile: null,
  loading: true,
  
  fetchUser: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      set({ user: data.user });
    } catch (error) {
      console.error('Error fetching user:', error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
  
  fetchProfile: async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.user.id)
        .single();
        
      if (error) throw error;
      set({ profile: data });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  },
  
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null });
  }
}));