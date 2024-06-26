import supabase, { supabaseUrl } from "./supabase";

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
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  //1. update Password OR fullName
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;
  //2. update the avatar image

  const fileName = `avatar-${data?.user?.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  //3. update the avatar in the user
  const { data: updateUser, error: userAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (userAvatarError) throw new Error(userAvatarError.message);

  return updateUser;
}
