from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/predict": {"origins": "*"}})


# 간단한 선형 회귀 모델 생성
model = LinearRegression()

# 학습 데이터
X_train = np.array([[1], [2], [3], [4], [5]])
y_train = np.array([2, 4, 5, 4, 5])

# 모델 훈련
model.fit(X_train, y_train)


@app.route('/predict', methods=['GET'])
def predict():
    try:
        # GET 요청으로 x 값을 받아옴
        x_value = float(request.args.get('x'))

        # 모델에 x 값을 넣어 예측
        prediction = model.predict([[x_value]])

        # 결과를 JSON 형태로 반환
        result = {"prediction": float(prediction[0])}
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, threaded=False)
