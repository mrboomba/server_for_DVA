import os
import sys
import numpy as np
from keras.preprocessing.image import ImageDataGenerator, load_img, img_to_array
from keras.models import Sequential, load_model
import csv
os.chdir(sys.argv[1])
img_width, img_height = 150, 150
model_path = './models/model.h5'
model_weights_path = './models/weights.h5'
model = load_model(model_path)
model.load_weights(model_weights_path)

def predict(file):
  x = load_img(file, target_size=(img_width,img_height))
  x = img_to_array(x)
  x = np.expand_dims(x, axis=0)
  array = model.predict(x)
  result = array[0]
  answer = np.argmax(result)
  return answer

<<<<<<< HEAD

=======
>>>>>>> 6b49fd3c9ecaeee35024c4c34e176c8f3dd5f6fd
DIR = sys.argv[2]
mydata  = []
for i, ret in enumerate(os.walk('../result/'+DIR)):
  print(ret)
  for i, filename in enumerate(ret[2]):
    if "rb" not in filename:
      continue
    result = predict(ret[0] + '/' + filename)
<<<<<<< HEAD
    mydata.append([result,int(filename.split("_")[0])])
myFile = open('../result/'+DIR+'/'+DIR+'.csv', 'w')
mydata.sort(key=lambda x: x[1])
with myFile:
    writer = csv.writer(myFile)
    writer.writerow(["direction","frame"])
    for x in mydata:
       writer.writerow(x)
=======
    mydata.append(result)
myFile = open('../result/'+DIR+'/'+DIR+'.csv', 'w')
with myFile:
    writer = csv.writer(myFile)
    writer.writerow("direction")
    for x in mydata:
       writer.writerow([x])
>>>>>>> 6b49fd3c9ecaeee35024c4c34e176c8f3dd5f6fd
     
print("Writing complete")
