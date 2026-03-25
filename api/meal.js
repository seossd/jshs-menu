export default async function handler(req, res) {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "date가 필요함" });
  }

  const API_KEY = process.env.NEIS_API_KEY;
  const ATPT_OFCDC_SC_CODE = "Q10";
  const SD_SCHUL_CODE = "8490069";

  const url =
    `https://open.neis.go.kr/hub/mealServiceDietInfo` +
    `?KEY=${API_KEY}` +
    `&Type=json` +
    `&pIndex=1` +
    `&pSize=100` +
    `&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}` +
    `&SD_SCHUL_CODE=${SD_SCHUL_CODE}` +
    `&MLSV_YMD=${date}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "급식 데이터를 가져오지 못했음" });
  }
}
