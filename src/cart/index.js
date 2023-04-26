const pdf = require("pdf-creator-node")
const fs = require("fs")
const path = require("path")

const data = {
    name: "Поло",
    desc: "Классическое поло с длинным рукавом. Обязательный атрибут любого поло - воротничок.",
    properties: [
        {
            name: "Пол",
            value: "Мужская"
        },
        {
            name: "Вид",
            value: "Лёгкая"
        },
        {
            name: "Подвид",
            value: "Верх"
        },
        {
            name: "Рукав",
            value: "Длинный"
        },
    ],
    
}

async function generate() {
    console.log("Regenerating pdf file...")

    const html = fs.readFileSync(path.join(__dirname, "template.html")).toString()

    const result = await pdf.create({
        html,
        data,
        path: path.join(__dirname, "output.pdf"),
        type: ""
    }, {
        format: "A4",
        orientation: "portrait",
        border: "9.906mm",
        header: {
            height: "15mm",
            contents: /*html*/
            `
            <style>
                body, html {
                    padding: 0px;
                    margin: 0px;
                }
            </style>
            <div>
                <span style="font-family: 'Noto Serif Display'; font-style: normal; font-weight: 500; font-size: 4.064mm; line-height: 5.5503mm; letter-spacing: -0.02em; color: #8C8B89;">FABRIKA</span>
                <div style="display: inline-block; position: absolute; right: 0; top: 0;">
                    <span style="font-family: 'Jost Light'; font-style: normal; font-weight: 200; font-size: 3.0479mm; line-height: 5.5033mm; letter-spacing: -0.02em; color: #8C8B89;">Техническое задание на пошив</span>
                    <span style="margin-left: 5.4186mm; font-family: 'Jost'; font-style: normal; font-weight: 400; font-size: 3.0479mm; line-height: 5.5033mm; letter-spacing: -0.02em; color: #131B23; text-align: right;">{{page}}/{{pages}}</span>
                </div>
            </div>
            `
        },
    })

    console.log("PDF file generated.")
}

function main() {
    generate()
    fs.watchFile(path.join(__dirname, "template.html"), generate)
}

main()