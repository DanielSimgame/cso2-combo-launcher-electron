import {Buffer} from "buffer";
import {promises as fs} from "fs";
import path from "path";
import { TextDecoder, TextEncoder } from 'util';

export default {
    parseVersion(versionString: string): Array<number> {
        return versionString.split(".").map((num) => parseInt(num));
    },
    ipSorter(iparray: string[]) {
        return iparray
            .map((ip) => this.parseVersion(ip))
            .sort((a, b) => {
                for (let i = 0; i < Math.min(a.length, b.length); i++) {
                    if (a[i] !== b[i]) {
                        return a[i] - b[i];
                    }
                }
                return a.length - b.length;
            })
            .map((version) => version.join("."));
            // .sort((a, b) => a.compare(b))
            // .map((version) => version.toString());
    },
    /**
     * @function pathLengthSaver
     * @description 用于截取文件路径，将所有反斜杠 \ 替换为正斜杠 /，以便在不同的操作系统中都能够正确处理路径，
     * 从路径中提取文件名，存储在变量 file 中，如果路径长度小于等于最大长度，则直接返回路径，否则进行下一步处理。
     * @param {string} pathStr 要截取的路径字符串
     * @param {number} maxlength 最大长度
     * @returns {string} 截取后的路径字符串
     * */
    pathLengthSaver(pathStr: string, maxlength: number): string {
        pathStr = pathStr.replace(/\\/g, "/");

        const file = path.basename(pathStr);

        if (pathStr.length <= maxlength) {
            return pathStr;
        }
        if (file.length > maxlength) {
            return file.slice(0, maxlength - 3) + "...";
        }
        if (file.length + 3 >= maxlength) {
            return "...".slice(0, maxlength - file.length) + file;
        }

        return pathStr.slice(0, maxlength - file.length)
            .slice(0, -3) + "..." + file;
    },
    getPercentage(smallNum: number, largeNum: number): number {
        return Math.floor((smallNum * 100) / largeNum);
    },
    changeTextEncoding(text: string, from: string, to: string): string {
        return new TextDecoder(to).decode(new TextEncoder(from).encode(text));
    },
    isBase64String (input: string): boolean {
        let regex = new RegExp("^[a-zA-Z0-9\+/]*={0,3}$")
        return regex.test(input)
    },
    splitString (input: string, unixStyle: boolean = false): string[] {
        // return unixStyle ? input.Split(char.Parse("\n")) : input.Split(new[] { Environment.NewLine }, StringSplitOptions.None);
        return unixStyle ? input.split("\n") : input.split("\r\n")
    },
    stringToHex (input: string, encode = "UTF-8") {
        let result: string = ""
        // let bytes: any[] = Encoding.GetEncoding(encode).GetBytes(input);
        let bytes = new TextEncoder().encode(input)

        // foreach (byte text in bytes)
        // result += text.ToString("X2");
        bytes.forEach((text) => {
            result += text.toString(16)
        })

        return result;
    },
    unicodeToString (input: string): string {
        let result: string = ""
        let bytes: any[] = []
        for (let i = 0; i < input.length; i += 2) {
            bytes.push(parseInt(input.substring(i, i + 2), 16))
        }
        // result = Encoding.Unicode.GetString(bytes);
        result = new TextDecoder().decode(new Uint8Array(bytes))
        return result
    },
    encrypt(content: string): string {
        if (content.trim().length === 0 || !this.isBase64String(content))
            return "";

        const lines = this.splitString(content);
        let str = "";
        for (let i = 0; i < lines.length; i++) {
            str += i === lines.length - 1
                ? Buffer.from(lines[i]).toString("base64")
                : Buffer.from(lines[i]).toString("base64") + "\n";
            // if (i === lines.length - 1)
            //     str += Buffer.from(lines[i]).toString("base64");
            // else
            //     str += Buffer.from(lines[i]).toString("base64") + "\n";
        }
        return Buffer.from(str).toString("base64");
    },
    decrypt(content: string): string {
        if (content.trim().length === 0 || !this.IsBase64String(content))
            return "";

        let str = "";
        const temp = Buffer.from(content, "base64").toString("utf8");
        const lines = this.splitString(temp);
        for (let i = 0; i < lines.length; i++) {
            str += i === lines.length - 1
                ? Buffer.from(lines[i], "base64").toString("utf8")
                : Buffer.from(lines[i], "base64").toString("utf8") + "\n";
        }
        return str;
    },
    async encryptFile(file: string, newfile: string): Promise<boolean> {
        try {
            const content = await fs.readFile(file, "utf8");
            const encrypted = this.encrypt(content);
            await fs.writeFile(newfile, encrypted, "utf8");
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    async decryptFile(file: string, newfile: string): Promise<boolean> {
        try {
            const content = await fs.readFile(file, "utf8");
            if (!this.isBase64String(content)) return false;

            const decrypted = this.decrypt(content);
            await fs.writeFile(newfile, decrypted, "utf8");
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
}
