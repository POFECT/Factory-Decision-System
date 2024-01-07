from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder, OneHotEncoder

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*"}})

# 간단한 선형 회귀 모델 생성
model = LinearRegression()

# 학습 데이터
X_train = np.array([
    # C100040LAXX001
    ["C100040LAXX001", "1270", "2", "50000"],
    ["C100040LAXX001", "1270", "1", "70000"],
    ["C100040LAXX001", "1270", "1", "70000"],
    ["C100040LAXX001", "1270", "1", "40000"],
    ["C100040LAXX001", "1270", "1", "35000"],
    ["C100040LAXX001", "1270", "1", "5000"],
    ["C100040LAXX001", "1270", "1", "10000"],
    ["C100040LAXX001", "1270", "1", "10000"],
    ["C100040LAXX001", "1270", "1", "60000"],
    ["C100040LAXX001", "1270", "1", "20000"],
    ["C100040LAXX001", "1270", "1", "5000"],
    ["C100040LAXX001", "970", "2", "70000"],
    ["C100040LAXX001", "970", "2", "30000"],
    ["C100040LAXX001", "1270", "2", "10000"],
    ["C100040LAXX001", "1270", "1", "50000"],
    ["C100040LAXX001", "1270", "1", "25000"],
    ["C100040LAXX001", "1270", "1", "5000"],
    ["C100040LAXX001", "970", "2", "25000"],
    ["C100040LAXX001", "1570", "1", "10000"],
    # C100040LAXX001
    ["Y002015Y8XX002", "1270", "3", "1850000"],
    ["C200045L3CA101", "1270", "2", "25000"],
    ["A040015LFXX001", "1270", "3", "30000"],
    ["Y001013L3XX001", "1270", "3", "950000"],
    ["A040020FFBB104", "1270", "2", "50000"],
    ["A040020FFBB104", "1270", "3", "150000"],
    ["A040020FFBB104", "1570", "2", "150000"],
    ["A040025LFBB104", "970", "3", "2000000"],
    ["A020020HFXX002", "970", "3", "150000"],
    ["A020020HFXX002", "1270", "2", "50000"],
    ["A020020HFXX002", "1270", "3", "25000"]
])
y_train = np.array([30000,70000,65000,28000,35000,5000,10000,3000,60000,20000,5000,50000,0,8000,50000,10000,5000,10000,10000, 0, 25000, 0, 0, 50000, 0, 150000, 0, 0, 50000, 0])

# Label encoding for the first column
label_encoder = LabelEncoder()
X_train[:, 0] = label_encoder.fit_transform(X_train[:, 0])

# One-hot encoding for categorical columns
categorical_columns = [0, 1, 2]  # assuming the first three columns are categorical
onehot_encoder = OneHotEncoder(handle_unknown='ignore', sparse=False, drop='first')
X_train_encoded = onehot_encoder.fit_transform(X_train[:, categorical_columns])
X_train = np.concatenate((X_train_encoded, X_train[:, 3:].astype(float)), axis=1)

# 모델 훈련
model.fit(X_train, y_train)


@app.route('/predict', methods=['GET'])
def predict():
    try:
        # GET 요청으로 x 값을 받아옴
        x_values = [request.args.get(f'x{i}') for i in range(4)]

        # Label encoding for the first column
        x_values[0] = label_encoder.transform([x_values[0]])[0]

        # One-hot encoding for categorical columns
        x_values_encoded = onehot_encoder.transform(np.array([x_values[:3]]))

        x_values = np.concatenate((x_values_encoded[0], np.array(x_values[3:]).astype(float)))

        # 모델에 x 값을 넣어 예측
        prediction = model.predict([x_values])

        # 결과를 JSON 형태로 반환
        result = {"prediction": float(prediction[0])}
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, threaded=False)
