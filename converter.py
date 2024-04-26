ctr = 0
excel_filename = "Book1.csv"
yaml_filename = excel_filename.replace('csv', 'yaml')
users = {}
id=0

with open(excel_filename, "r") as excel_csv:
    for line in excel_csv:
        if ctr == 0:
            ctr+=1  # Skip the coumn header
        else:
            # save the csv as a dictionary
            project,po,swe5,swe6,result = line.split(";")
            users[id]={
                   'id':id,
                   'project':project.split(" * "),
                   'po':po.split(" * "),
                   'results':result.replace(":",";").split("\n")[0].split(" * ")
                }
            id+=1

with open(yaml_filename, "w+") as yf :
    for u in users:
        for k,v in users[u].items():
            if k=="id":
                yf.write(f"- {k} : {v}\n")
            else:
                yf.write(f"  {k} : \n")
                for element in v:
                    yf.write(f"  - {element}\n")
