import alt from 'alt';
import fs from 'fs';
import path from 'path';

const resourceDir = alt.getResourcePath('alt-field');

function LoadFiles() {
    let filesLoaded = 0;
    const folders = fs.readdirSync(path.join(alt.rootDir, '/resources/alt-field/server/'));
    const filterFolders = folders.filter(x => !x.includes('.js'));
    for (let i = 0; i < filterFolders.length; i++) {
        const folder = filterFolders[i];
        const files = fs.readdirSync(
            path.join(alt.rootDir, `/resources/MilitaryWars/server/${folder}`)
        );
        const filterFiles = files.filter(x => x.includes('.js') || x.includes('.mjs'));
        for (let f = 0; f < filterFiles.length; f++) {
            const newPath = `./${folder}/${filterFiles[f]}`;
            import(newPath)
                .catch(err => {
                    console.log('\r\n\x1b[31m[Dosyalar yüklenirken hata oluştu.]');
                    console.log(err);
                    alt.log(`\r\n --> Yüklenemedi: ${newPath}`);
                    alt.log('\r\n\x1b[31mKapatılıyor.. \r\n');
                    process.exit(1);
                })
                .then(loadedResult => {
                    if (loadedResult) {
                        filesLoaded += 1;
                    } else {
                        alt.log(`Yüklenirken Hata: ${newPath}`);
                        alt.log('Kapatılıyor.');
                        process.exit(1);
                    }
                });
        }
    }

    setTimeout(() => {
        alt.log('\r\nMilitaryWars Başlatılıyor. Dosyalar Yükleniyor.\r\n');
    }, 5000);
}

LoadFiles()
