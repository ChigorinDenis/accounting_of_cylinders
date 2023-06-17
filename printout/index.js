const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const { format, parseISO } = require("date-fns");
const buildSummary = require("./buildSummary");


const trasformPoints = (data) => {
  return data.map((item) => {
    return {
      ...item,
      point_1: item.point_1.toFixed(2),
      point_2: item.point_2.toFixed(2),
      point_3: item.point_3.toFixed(2),
      point_4: item.point_4.toFixed(2),
      point_5: item.point_5.toFixed(2),
      point_6: item.point_6.toFixed(2),
      point_7: item.point_7.toFixed(2),
      point_8: item.point_8.toFixed(2),
      point_9: item.point_9.toFixed(2),
    }
  });
};

 const trasformEmployees = (data) => {
    return data.map((item) => {
      const [firstname, secondname, lastname] = item.fullname.split(" ");
      const fullname = `${firstname} ${secondname[0]}.${lastname[0]}.`;
      return {
        ...item,
        certificate_date: format(new Date(item.certificate_date), "dd.MM.yyyy"),
        fullname,
      }
    })
 };
 const trasformControls = (data) => ({
  ...data,
  date: format(new Date(data.date), "dd.MM.yyyy"),
 })

const fs = require("fs");
const path = require("path");

// Load the docx file as binary content
const runWord = (data) => {
const content = fs.readFileSync(
    path.resolve(__dirname, "templates", "template.docx"),
    "binary"
);


const zip = new PizZip(content);

const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
});

const summary = buildSummary({
  visual: data.visual_result,
  ultrasonic: data.ultrasonic_result,
  solid: data.solid_result,
  pneumatic: data.pneumatic_result,
})

doc.setData({
  expertise_data: trasformControls(data.expertise_data[0]),
  list_baloons: data.visual_result.map((item) => (item.prod_number)).join(', '),
  visual_control: trasformControls(data.visual_control[0]),
  ultrasonic_control: trasformControls(data.ultrasonic_control[0]),
  solid_control: trasformControls(data.solid_control[0]),
  pneumatic_control: trasformControls(data.pneumatic_control[0]),
  ultrasonic_result: trasformPoints(data.ultrasonic_result),
  solid_result: data.solid_result,
  visual_employees: trasformEmployees(data.visual_employees),
  solid_employees: trasformEmployees(data.solid_employees),
  ultrasonic_employees: trasformEmployees(data.ultrasonic_employees),
  pneumatic_employees: trasformEmployees(data.pneumatic_employees),
  visual_equipments: data.visual_equipments,
  solid_equipments: data.solid_equipments,
  ultrasonic_equipments: data.ultrasonic_equipments,
  pneumatic_equipments: data.pneumatic_equipments,
  vs_summary: summary.visual,
  ul_summary: summary.ultrasonic,
  sl_summary: summary.solid,
  pn_summary: summary.pneumatic,
});

doc.render();

const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
});

// buf is a nodejs Buffer, you can either write it to a
// file or res.send it with express for example.
fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);
}

module.exports = runWord;