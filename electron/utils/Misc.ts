export default {
    StringToHex: (input: string, encode = "UTF-8") => {
        let result: string = ""
        // let bytes: any[] = Encoding.GetEncoding(encode).GetBytes(input);
        let bytes = new TextEncoder().encode(input)

        // foreach (byte text in bytes)
        // result += text.ToString("X2");
        bytes.forEach((text) => {
            result += text.toString(16)
        })

        return result;
    }
}
