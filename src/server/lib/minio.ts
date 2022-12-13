import * as Minio from 'minio';
import { LighthouseRunReport } from "@prisma/client";
import path from "path";

const BUCKET_NAME = process.env.MINIO_BUCKET as string;

const client = new Minio.Client({
    endPoint: process.env.MINIO_HOST as string,
    port: process.env.MINIO_PORT ? parseInt(process.env.MINIO_PORT as string) : 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY as string,
    secretKey: process.env.MINIO_SECRET_KEY as string
})


export const getReportFile = (report: LighthouseRunReport, type: 'html' | 'json' = 'html', mobileVersion?: boolean) => {
    if (!report.htmlReportFile) {
        return null;
    }

    const fileName = mobileVersion ? report.htmlReportFile.replace('desktop', 'mobile') : report.htmlReportFile;
    const file = type === 'json' ? `${ path.basename(fileName, '.html') }.json` : fileName

    let data = '';
    return new Promise<string>((resolve, reject) => {
        client.getObject(BUCKET_NAME, file, (e, dataStream) => {
            if (e) {
                return reject(e);
            }
            dataStream.on('data', (chunk) => {
                data += chunk
            })
            dataStream.on('end', function () {
                resolve(data);
            })
        })
    })
}

export const hasReportFile = async (report: LighthouseRunReport, type: 'html' | 'json' = 'html', mobileReport?: boolean) => {
    try {
        if (!report.htmlReportFile) {
            return false;
        }
        const fileName = mobileReport ? report.htmlReportFile.replace('desktop', 'mobile') : report.htmlReportFile;
        const file = type === 'json' ? `${ path.basename(fileName, '.html') }.json` : fileName
        await client.statObject(BUCKET_NAME, file);
        return true;
    } catch {
        return false;
    }
}


export const saveReportFile = (file: string, content: string) => {
    return new Promise<void>((resolve, reject) => {
        client.putObject(BUCKET_NAME, file, content, (e) => {
                if (e) {
                    return reject(e);
                }
                resolve();
            }
        )
    })
}
