import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const directories = [
    'public/assets',
    'public/banners',
    'public/assets/media'
];

async function compressImages() {
    const report = [];
    for (const dir of directories) {
        const fullPath = path.resolve(dir);
        if (!fs.existsSync(fullPath)) continue;

        const files = fs.readdirSync(fullPath);
        for (const file of files) {
            if (file.startsWith('temp_')) continue;

            const filePath = path.join(fullPath, file);
            const ext = path.extname(file).toLowerCase();

            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                const stats = fs.statSync(filePath);
                const sizeInMB = stats.size / 1024 / 1024;

                const tempPath = path.join(fullPath, `temp_${file}`);

                try {
                    let pipeline = sharp(filePath);

                    // --- POWER COMPRESSION: RESIZING ---
                    let width = null;
                    if (file.includes('footershell') || file.includes('mainbg')) {
                        width = 1920; // Backgrounds don't need to be 5.6K
                    } else if (dir.includes('banners')) {
                        width = file.includes('mobile') ? 800 : 1400;
                    } else if (dir.includes('media')) {
                        width = 800; // Book covers are thumbnails/modals, 800px is plenty
                    }

                    if (width) {
                        pipeline = pipeline.resize({ width, withoutEnlargement: true });
                    }

                    // --- COMPRESSION SETTINGS ---
                    let quality = 75; // Sweet spot
                    if (sizeInMB > 1) quality = 70;

                    if (ext === '.jpg' || ext === '.jpeg') {
                        pipeline = pipeline.jpeg({ quality, mozjpeg: true });
                    } else if (ext === '.png') {
                        pipeline = pipeline.png({ quality, compressionLevel: 9 });
                    }

                    await pipeline.toFile(tempPath);

                    const newStats = fs.statSync(tempPath);
                    if (newStats.size < stats.size) {
                        report.push({
                            file,
                            oldSize: sizeInMB.toFixed(2) + ' MB',
                            newSize: (newStats.size / 1024 / 1024).toFixed(2) + ' MB',
                            reduction: Math.round((1 - newStats.size / stats.size) * 100) + '%',
                            status: 'Ready (Use swap-images.js)'
                        });
                    } else {
                        fs.unlinkSync(tempPath);
                        report.push({ file, oldSize: sizeInMB.toFixed(2) + ' MB', status: 'Already optimal' });
                    }
                } catch (err) {
                    report.push({ file, status: 'Error', error: err.message });
                    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
                }
            }
        }
    }
    console.table(report);
    console.log('\n--- IMPORTANT ---');
    console.log('Original files were NOT replaced because of Node.js file locks.');
    console.log('Run "node scripts/swap-images.js" AFTER stopping your dev server to apply changes.');
}

compressImages().then(() => console.log('Compression complete!'));
