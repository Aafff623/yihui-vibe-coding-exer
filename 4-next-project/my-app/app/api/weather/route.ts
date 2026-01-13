export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return Response.json(
      { error: "请提供城市名称" },
      { status: 400 }
    );
  }

  try {
    // 调用外部天气API
    const weatherApiKey = process.env.WEATHER_API_KEY;
    
    if (!weatherApiKey) {
      return Response.json(
        { error: "天气API密钥未配置" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`
    );

    const data = await response.json();

    // 简化返回的数据
    return Response.json({
      city: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
    });
  } catch (error) {
    return Response.json(
      { error: "获取天气信息失败" },
      { status: 500 }
    );
  }
}
