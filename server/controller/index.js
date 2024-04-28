const { Op } = require('sequelize'); // 추가된 부분

// 메인 화면
exports.index = async (req, res) => {
  try {
    console.log('controller 연결 성공');
  } catch (error) {
    console.log('에러 코드 ', error);
    res.status(500).send('홈페이지에 접근할 수 없습니다.');
  }
};


// exports.getSession = async (req, res) => {
//   const user = req.session.user;
//   console.log('user', req.session);
//   res.send({ result: true, user: user });
// };
