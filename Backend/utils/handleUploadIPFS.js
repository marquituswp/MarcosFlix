const uploadToPinata = async (fileBuffer, fileName) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    const blob = new Blob([fileBuffer])
    const file = new File([blob], fileName)
    data.append('file', file);
    const metadata = JSON.stringify({
        name: fileName
    });
    data.append('pinataMetadata', metadata);
    const options = JSON.stringify({
        cidVersion: 0,
    });
    data.append('pinataOptions', options);
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'pinata_api_key': process.env.PINATA_API_KEY,
                'pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY
            }
        });
        if (!response.ok) {
            throw new Error(`Error al subir el archivo: ${response.statusText}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error al subir el archivo a Pinata:', error);
        throw error;
    }
 };

module.exports = {uploadToPinata}