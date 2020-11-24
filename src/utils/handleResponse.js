export default function handleResponse(res, data) {
  return res.status(200).json({
    success: true,
    data: data || null
  });
}
