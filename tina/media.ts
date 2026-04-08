import type { MediaStore } from 'tinacms';

export default class CustomMediaStore implements MediaStore {
  accept = 'image/*';

  async persist(files: any[], options?: any): Promise<any> {
    const hash = window.location.hash;

    const clean = hash.replace('#/', '');
    const parts = clean.split('/');

    // ✅ correct indexes for your URL
    const category = parts[3] || 'general';
    const slug = parts[4] || 'post';

    const uploaded = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append('image', file.file);
        formData.append('category', category);
        formData.append('slug', slug);

        const res = await fetch(
          'https://uploadimage-134044598052.europe-west1.run.app/upload-image',
          {
            method: 'POST',
            body: formData,
          },
        );

        const data = await res.json();

        return {
          id: data.url,
          type: 'file' as const,
          filename: file.file.name,
          directory: '',
          src: data.url,
        };
      }),
    );

    return uploaded;
  }

  async delete() {
    return;
  }

  async list() {
    return {
      items: [],
    };
  }
}
