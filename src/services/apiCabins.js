import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}

/*eslint-disable*/

export async function createEditCabin(newCabin, id) {
  //https://ikchegbicnagaaktgytd.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //1. creat cabin

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  //creating new item
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //updating existing item
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = query.select().single();

  console.log(data, "---->data");
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) return data;

  //2. upload to storage

  const { data: storageData, error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image couldn't be uploaded and the cabin was not created"
    );
  }

  console.log("storageData: ", storageData);

  return data;
}
/*eslint-disable*/
export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
