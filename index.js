const { Command } = require("commander");
const fs = require("fs");

const program = new Command();

program
  .name("dtask")
  .description("CLI to add remove show daily task")
  .version("1.0.0");

program
  .command("add")
  .description("add daily task ")
  .argument("<task>", "daily task")
  .option("-p, --priority <int>", "set priority order integer ")

  .action((str, options) => {
    let priority = 9999;
    if (options.priority) {
      priority = options.priority;
    }
    fs.readFile("file.json", "utf-8", (err, data) => {
      if (err) {
        fs.writeFile(
          "file.json",
          JSON.stringify([{ id: 0, todo: str, priority: priority }]),
          (err) => {}
        );
      } else {
        data = JSON.parse(data);

        data.push({ id: data.length, todo: str, priority: priority });

        fs.writeFileSync("file.json", JSON.stringify(data), "utf-8");
      }
    });
  });

program
  .command("show")
  .description("show daily task")
  .option("-p, --priority", "display with priority order")
  .action((options) => {
    if (options.priority == true) {
      fs.readFile("file.json", "utf-8", (err, data) => {
        if (err) {
          console.log("Add task first");
        } else {
          data = JSON.parse(data);
          for (let i = 0; i < data.length; i++) {
            let element = data[i]["priority"];
            for (let j = 0; j < data.length; j++) {
              if (element < data[j]["priority"]) {
                let t1 = data[j];
                data.splice(j, 1, data[i]);
                data.splice(i, 1, t1);
              }
            }
          }
          console.log(data);
        }
      });
    } else {
      fs.readFile("file.json", "utf-8", (err, data) => {
        if (err) {
          console.log("Add task first");
        } else {
          data = JSON.parse(data);
          for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
          }
        }
      });
    }
  });

program
  .command("remove")
  .description("remove task with id ")
  .argument("<id>", "id")
  .action((int) => {
    fs.readFile("file.json", "utf-8", (err, data) => {
      if (err) {
        console.log("Add task first");
      } else {
        console.log("Hello here is data", data);
        data = JSON.parse(data);
        let i;
        for (i = 0; i < data.length; i++) {
          if (data[i]["id"] == int) {
            break;
          }
        }
        let x = data.splice(i, 1);
        for (let j = 0; j < data.length; j++) {
          data[j]["id"] = j;
        }
        fs.writeFile("file.json", JSON.stringify(data), (err) => {
          console.log(x);
        });
      }
    });
  });

program
  .command("update <task> <id>")
  .description("update task with id ")
  .action((task, id) => {
    id = parseInt(id);
    fs.readFile("file.json", "utf-8", (err, data) => {
      data = JSON.parse(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i]["id"] === id) {
          data[i]["todo"] = task;
          fs.writeFile("file.json", JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log("task updated");
          });

          break;
        }
      }
    });
  });

program.parse();
