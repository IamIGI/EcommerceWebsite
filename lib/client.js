import SanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

//42 min of tutorial https://youtu.be/4mOkFXyxfsU?t=2562
export const client = SanityClient({
    projectId: 'a0kgdebl',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
