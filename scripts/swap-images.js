import fs from 'fs';
import path from 'path';

const directories = [
    'public/assets',
    'public/banners',
    'public/assets/media'
];

async function swapFiles() {
    for (const dir of directories) {
        const fullPath = path.resolve(dir);
        if (!fs.existsSync(fullPath)) continue;

        const files = fs.readdirSync(fullPath);
        for (const file of files) {
            if (file.startsWith('temp_')) {
                const originalName = file.replace('temp_', '');
                const tempPath = path.join(fullPath, file);
                const originalPath = path.join(fullPath, originalName);

                try {
                    if (fs.existsSync(originalPath)) {
                        fs.unlinkSync(originalPath);
                    }
                    fs.renameSync(tempPath, originalPath);
                    console.log(`Swapped ${originalName}`);
                } catch (err) {
                    console.error(`Failed to swap ${originalName}:`, err.message);
                }
            }
        }
    }
}

swapFiles().then(() => console.log('Swap complete!'));
