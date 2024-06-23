import supabase from "./supabase";

export async function signUp({ fullName, email, password }) {
  const { data, error } = supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  // console.log({ getSession });
  // const { data: session } = getSession;
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  // console.log({ data });

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1. update Password OR fullName
  //2. update the avatar image
  //3. update the avatar in the user
}
