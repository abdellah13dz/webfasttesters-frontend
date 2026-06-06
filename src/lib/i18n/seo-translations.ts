import type { Language } from '@/lib/i18n/context';

type SeoTranslationMap = Record<string, string>;

const en: SeoTranslationMap = {
  'seo.defaultTitle': 'Fast Testers - Get 12 Testers for Google Play in 48 Hours',
  'seo.defaultDescription':
    'Fast Testers helps Android developers meet Google Play 12-tester requirement in 48 hours. Real testers, fast production access, and guaranteed approval.',
  'seo.homeTitle': 'Fast Testers - Get 12 Testers for Google Play in 48 Hours',
  'seo.homeDescription':
    'Meet Google Play 12-tester requirement fast. Real Android testers, production access in 48 hours, and guaranteed approval. Trusted by 1,500+ developers.',
  'seo.howItWorksTitle': 'How It Works - Fast Testers | Simple 3-Step App Testing Process',
  'seo.howItWorksDescription':
    'Submit your app, get matched with 12+ real Android testers, and achieve Google Play production access in just 48 hours. See our simple process.',
  'seo.pricingTitle': 'Pricing - Fast Testers | $15/App Testing for Google Play Compliance',
  'seo.pricingDescription':
    'Simple pricing at $15 per app. Get 12+ real testers, 14-day testing period, detailed reports, and Google Play production access guaranteed.',
  'seo.faqTitle': 'FAQ - Fast Testers | Common Questions About Google Play Testing',
  'seo.faqDescription':
    'Answers to common questions about Google Play 12-tester requirement, our testing process, pricing, and how to get production access quickly.',
  'seo.aboutUsTitle': 'About Us - Fast Testers | Helping Developers Meet Google Play Standards',
  'seo.aboutUsDescription':
    'Learn about Fast Testers mission to help Android developers navigate Google Play testing requirements and achieve production access faster.',
  'seo.reviewsTitle': 'Reviews - Fast Testers | Trusted by 1,500+ Android Developers',
  'seo.reviewsDescription':
    'Read verified reviews from developers who used Fast Testers to meet Google Play 12-tester requirement. 4.9/5 average rating across 1,500+ users.',
  'seo.supportTitle': 'Support Center - Fast Testers | Help & Resources for App Testing',
  'seo.supportDescription':
    'Get help with Google Play testing requirements. Browse our knowledge base, guides, and contact our support team for fast assistance.',
  'seo.contactTitle': 'Contact Us - Fast Testers | Get in Touch for App Testing Help',
  'seo.contactDescription':
    'Contact the Fast Testers team for help with Google Play testing requirements, account questions, or partnership inquiries. We respond within 2 hours.',
  'seo.feedbackTitle': 'Feedback - Fast Testers | Share Your Experience & Suggestions',
  'seo.feedbackDescription':
    'Share your feedback about Fast Testers. Help us improve our app testing service and make it easier for developers to meet Google Play requirements.',
  'seo.termsAndConditionsTitle': 'Terms and Conditions - Fast Testers | Service Agreement',
  'seo.termsAndConditionsDescription':
    'Read the Fast Testers terms and conditions covering our app testing service, user responsibilities, payment terms, and Google Play compliance services.',
  'seo.privacyPolicyTitle': 'Privacy Policy - Fast Testers | Data Protection & Privacy',
  'seo.privacyPolicyDescription':
    'Learn how Fast Testers handles your data, protects your privacy, and ensures security for your app testing information and personal details.',
  'seo.refundPolicyTitle': 'Refund Policy - Fast Testers | Money-Back Guarantee',
  'seo.refundPolicyDescription':
    'Fast Testers offers a full refund if your app does not achieve Google Play production access. Read our transparent refund policy and guarantee terms.',
  'seo.referralProgramTitle': 'Referral Program - Fast Testers | Earn Rewards for Referring Developers',
  'seo.referralProgramDescription':
    'Join the Fast Testers referral program and earn rewards for every developer you refer. Help others meet Google Play testing requirements and get paid.',
  'seo.referralPolicyTitle': 'Referral Policy - Fast Testers | Referral Program Terms & Conditions',
  'seo.referralPolicyDescription':
    'Read the Fast Testers referral program policy covering eligibility, reward structure, payout terms, and conditions for referring new developers.',
  'seo.blogTitle': 'Blog - Fast Testers | Google Play Testing Guides & Android Insights',
  'seo.blogDescription':
    'Expert guides on Google Play 12-tester policy, Android app testing best practices, and production access tips. Stay updated with Fast Testers blog.',
  'seo.publishAppGooglePlayTitle': 'How to Publish an App on Google Play - Fast Testers | Complete Guide',
  'seo.publishAppGooglePlayDescription':
    'Step-by-step guide to publish your Android app on Google Play, including 12-tester requirement, closed testing, and production access walkthrough.',
  'seo.enterpriseOnboardingTitle': 'Enterprise Onboarding Guide - Fast Testers | Bulk App Testing Setup',
  'seo.enterpriseOnboardingDescription':
    'Complete enterprise onboarding guide for teams with multiple apps. Learn how to set up bulk testing, manage testers, and streamline Google Play compliance.',
  'seo.blog12TestersPolicyTitle': 'Google Play 12-Testers Policy Explained - Fast Testers | Complete Guide',
  'seo.blog12TestersPolicyDescription':
    'Everything you need to know about Google Play 12-tester policy: requirements, timelines, exemptions, and how to meet the standard quickly.',
  'seo.androidAppTestersTitle': 'Android App Testers - Fast Testers | Real Testers for Google Play Compliance',
  'seo.androidAppTestersDescription':
    'Get real Android app testers who help you meet Google Play 12-tester requirement. Professional testers with devices, feedback, and 48-hour delivery.',
  'seo.betaTestersGuideTitle': 'How to Find Beta Testers for Android Apps - Fast Testers | Expert Guide',
  'seo.betaTestersGuideDescription':
    'Struggling to find beta testers? Learn proven strategies to recruit Android beta testers and meet Google Play 12-tester requirement fast and reliably.',
  'seo.productionAccess12TestersTitle': 'Google Play Production Access with 12 Testers - Fast Testers | Guide',
  'seo.productionAccess12TestersDescription':
    'Achieve Google Play production access by meeting the 12-tester requirement. Our guide covers the exact steps to move from closed testing to production.',
  'seo.closedTestingTitle': 'Google Play Closed Testing - Fast Testers | Complete Closed Testing Guide',
  'seo.closedTestingDescription':
    'Master Google Play closed testing with our complete guide. Learn requirements, setup steps, tester management, and how to graduate to production access.',
  'seo.appRejectedTitle': 'App Rejected by Google Play? - Fast Testers | Fix Rejections Fast',
  'seo.appRejectedDescription':
    'Your app was rejected by Google Play? Learn common rejection reasons and how Fast Testers helps you fix issues and get approved for production access.',
  'seo.multiLanguageTestingTitle': 'Multi-Language App Testing - Fast Testers | Global Testing Coverage',
  'seo.multiLanguageTestingDescription':
    'Test your Android app across multiple languages and regions. Fast Testers provides multi-language testing to ensure Google Play compliance worldwide.',
  'seo.setupGuideTitle': 'Google Play Setup Guide - Fast Testers | Complete Developer Setup',
  'seo.setupGuideDescription':
    'Complete guide to setting up your Google Play Developer account, configuring closed testing, and preparing your app for the 12-tester requirement.',
  'seo.sampleAppTitle': 'Sample App - Fast Testers | Try Our Demo App Testing Experience',
  'seo.sampleAppDescription':
    'Try the Fast Testers sample app to see how our testing process works. Experience real tester feedback, bug reports, and Google Play compliance testing.',
  'seo.submitAppTitle': 'Submit Your App - Fast Testers | Start Google Play Testing Today',
  'seo.submitAppDescription':
    'Submit your Android app for testing with Fast Testers. Get matched with 12+ real testers, receive detailed feedback, and achieve production access.',
  'seo.partnersTitle': 'Partners - Fast Testers | Partner With Us for App Testing Solutions',
  'seo.partnersDescription':
    'Partner with Fast Testers to offer app testing services to your clients. Integration options, affiliate programs, and co-branded solutions available.',
  'seo.statusTitle': 'System Status - Fast Testers | Service Uptime & Performance',
  'seo.statusDescription':
    'Check Fast Testers system status, uptime monitoring, and service health. Real-time updates on our app testing platform availability and performance.',
  'seo.changelogTitle': 'Changelog - Fast Testers | Platform Updates & New Features',
  'seo.changelogDescription':
    'Stay updated with Fast Testers platform changes, new features, and improvements. See our latest releases and upcoming enhancements for app testing.',
  'seo.compareTitle': 'Compare - Fast Testers vs Competitors | App Testing Service Comparison',
  'seo.compareDescription':
    'Compare Fast Testers with other app testing services. See pricing, speed, tester quality, and features side by side. Save up to 80% with Fast Testers.',
  'seo.caseStudiesTitle': 'Case Studies - Fast Testers | Developer Success Stories & Results',
  'seo.caseStudiesDescription':
    'Read real success stories from developers who achieved Google Play production access using Fast Testers. See metrics, timelines, and measurable results.',
  'seo.cookiePolicyTitle': 'Cookie Policy - Fast Testers | Cookie Usage & Consent',
  'seo.cookiePolicyDescription':
    'Learn how Fast Testers uses cookies, what types we use, and how to manage your cookie preferences for our app testing platform.',
  'seo.loginTitle': 'Login - Fast Testers Developer Dashboard',
  'seo.loginDescription':
    'Sign in to your Fast Testers account to manage app testing orders and track Google Play compliance progress.',
  'seo.signupTitle': 'Sign Up - Fast Testers | Create Your Developer Account',
  'seo.signupDescription':
    'Create a Fast Testers account to submit apps for Google Play 12-tester testing and track production access progress.',
  'seo.forgotPasswordTitle': 'Reset Password - Fast Testers',
  'seo.forgotPasswordDescription':
    'Reset your Fast Testers account password to regain access to your app testing dashboard.',
};

const es: SeoTranslationMap = {
  'seo.defaultTitle': 'Fast Testers - Obtén 12 Testers para Google Play en 48 Horas',
  'seo.defaultDescription':
    'Fast Testers ayuda a desarrolladores Android a cumplir el requisito de 12 testers de Google Play en 48 horas. Testers reales, acceso a producción rápido y aprobación garantizada.',
  'seo.homeTitle': 'Fast Testers - Obtén 12 Testers para Google Play en 48 Horas',
  'seo.homeDescription':
    'Cumple el requisito de 12 testers de Google Play rápidamente. Testers reales de Android, acceso a producción en 48 horas y aprobación garantizada. Confiado por más de 1,500 desarrolladores.',
  'seo.howItWorksTitle': 'Cómo Funciona - Fast Testers | Proceso de Prueba de Apps en 3 Pasos',
  'seo.howItWorksDescription':
    'Envía tu app, obtén 12+ testers reales de Android y logra acceso a producción de Google Play en solo 48 horas. Conoce nuestro proceso simple.',
  'seo.pricingTitle': 'Precios - Fast Testers | Pruebas de Apps por $15 para Cumplimiento de Google Play',
  'seo.pricingDescription':
    'Precios simples a $15 por app. Obtén 12+ testers reales, período de prueba de 14 días, informes detallados y acceso a producción garantizado.',
  'seo.faqTitle': 'Preguntas Frecuentes - Fast Testers | Preguntas sobre Pruebas de Google Play',
  'seo.faqDescription':
    'Respuestas a preguntas comunes sobre el requisito de 12 testers de Google Play, nuestro proceso de prueba, precios y cómo obtener acceso a producción rápidamente.',
  'seo.aboutUsTitle': 'Sobre Nosotros - Fast Testers | Ayudando a Desarrolladores a Cumplir Estándares de Google Play',
  'seo.aboutUsDescription':
    'Conoce la misión de Fast Testers de ayudar a desarrolladores Android a navegar los requisitos de prueba de Google Play y lograr acceso a producción más rápido.',
  'seo.reviewsTitle': 'Reseñas - Fast Testers | Confiado por Más de 1,500 Desarrolladores Android',
  'seo.reviewsDescription':
    'Lee reseñas verificadas de desarrolladores que usaron Fast Testers para cumplir el requisito de 12 testers de Google Play. Calificación promedio de 4.9/5.',
  'seo.supportTitle': 'Centro de Soporte - Fast Testers | Ayuda y Recursos para Pruebas de Apps',
  'seo.supportDescription':
    'Obtén ayuda con los requisitos de prueba de Google Play. Explora nuestra base de conocimiento, guías y contacta a nuestro equipo de soporte.',
  'seo.contactTitle': 'Contáctanos - Fast Testers | Ayuda para Pruebas de Apps',
  'seo.contactDescription':
    'Contacta al equipo de Fast Testers para ayuda con requisitos de prueba de Google Play, preguntas de cuenta o consultas de asociación. Respondemos en 2 horas.',
  'seo.feedbackTitle': 'Comentarios - Fast Testers | Comparte Tu Experiencia y Sugerencias',
  'seo.feedbackDescription':
    'Comparte tus comentarios sobre Fast Testers. Ayúdanos a mejorar nuestro servicio de pruebas de apps y facilitar el cumplimiento de requisitos de Google Play.',
  'seo.termsAndConditionsTitle': 'Términos y Condiciones - Fast Testers | Acuerdo de Servicio',
  'seo.termsAndConditionsDescription':
    'Lee los términos y condiciones de Fast Testers que cubren nuestro servicio de pruebas de apps, responsabilidades del usuario, términos de pago y servicios de cumplimiento de Google Play.',
  'seo.privacyPolicyTitle': 'Política de Privacidad - Fast Testers | Protección de Datos y Privacidad',
  'seo.privacyPolicyDescription':
    'Aprende cómo Fast Testers maneja tus datos, protege tu privacidad y garantiza la seguridad de tu información de pruebas de apps y datos personales.',
  'seo.refundPolicyTitle': 'Política de Reembolso - Fast Testers | Garantía de Devolución',
  'seo.refundPolicyDescription':
    'Fast Testers ofrece reembolso completo si tu app no logra acceso a producción de Google Play. Lee nuestra política de reembolso transparente y términos de garantía.',
  'seo.referralProgramTitle': 'Programa de Referidos - Fast Testers | Gana Recompensas por Referir Desarrolladores',
  'seo.referralProgramDescription':
    'Únete al programa de referidos de Fast Testers y gana recompensas por cada desarrollador que refieras. Ayuda a otros a cumplir requisitos de Google Play y recibe pago.',
  'seo.referralPolicyTitle': 'Política de Referidos - Fast Testers | Términos del Programa de Referidos',
  'seo.referralPolicyDescription':
    'Lee la política del programa de referidos de Fast Testers que cubre elegibilidad, estructura de recompensas, términos de pago y condiciones para referir nuevos desarrolladores.',
  'seo.blogTitle': 'Blog - Fast Testers | Guías de Prueba de Google Play e Insights de Android',
  'seo.blogDescription':
    'Guías expertas sobre la política de 12 testers de Google Play, mejores prácticas de prueba de apps Android y consejos de acceso a producción.',
  'seo.publishAppGooglePlayTitle': 'Cómo Publicar una App en Google Play - Fast Testers | Guía Completa',
  'seo.publishAppGooglePlayDescription':
    'Guía paso a paso para publicar tu app Android en Google Play, incluyendo requisito de 12 testers, pruebas cerradas y acceso a producción.',
  'seo.enterpriseOnboardingTitle': 'Guía de Incorporación Empresarial - Fast Testers | Configuración de Pruebas Masivas',
  'seo.enterpriseOnboardingDescription':
    'Guía completa de incorporación empresarial para equipos con múltiples apps. Aprende a configurar pruebas masivas, gestionar testers y agilizar el cumplimiento de Google Play.',
  'seo.blog12TestersPolicyTitle': 'Política de 12 Testers de Google Play Explicada - Fast Testers | Guía Completa',
  'seo.blog12TestersPolicyDescription':
    'Todo lo que necesitas saber sobre la política de 12 testers de Google Play: requisitos, plazos, exenciones y cómo cumplir el estándar rápidamente.',
  'seo.androidAppTestersTitle': 'Testers de Apps Android - Fast Testers | Testers Reales para Cumplimiento de Google Play',
  'seo.androidAppTestersDescription':
    'Obtén testers reales de apps Android que te ayuden a cumplir el requisito de 12 testers de Google Play. Testers profesionales con dispositivos, feedback y entrega en 48 horas.',
  'seo.betaTestersGuideTitle': 'Cómo Encontrar Beta Testers para Apps Android - Fast Testers | Guía Experta',
  'seo.betaTestersGuideDescription':
    '¿Problemas para encontrar beta testers? Aprende estrategias probadas para reclutar beta testers de Android y cumplir el requisito de 12 testers de Google Play.',
  'seo.productionAccess12TestersTitle': 'Acceso a Producción de Google Play con 12 Testers - Fast Testers | Guía',
  'seo.productionAccess12TestersDescription':
    'Logra acceso a producción de Google Play cumpliendo el requisito de 12 testers. Nuestra guía cubre los pasos exactos para pasar de pruebas cerradas a producción.',
  'seo.closedTestingTitle': 'Pruebas Cerradas de Google Play - Fast Testers | Guía Completa',
  'seo.closedTestingDescription':
    'Domina las pruebas cerradas de Google Play con nuestra guía completa. Aprende requisitos, pasos de configuración, gestión de testers y cómo graduar a acceso de producción.',
  'seo.appRejectedTitle': '¿App Rechazada por Google Play? - Fast Testers | Soluciona Rechazos Rápido',
  'seo.appRejectedDescription':
    '¿Tu app fue rechazada por Google Play? Aprende razones comunes de rechazo y cómo Fast Testers te ayuda a solucionar problemas y obtener aprobación de producción.',
  'seo.multiLanguageTestingTitle': 'Pruebas de Apps Multiidioma - Fast Testers | Cobertura Global de Pruebas',
  'seo.multiLanguageTestingDescription':
    'Prueba tu app Android en múltiples idiomas y regiones. Fast Testers ofrece pruebas multiidioma para garantizar cumplimiento de Google Play en todo el mundo.',
  'seo.setupGuideTitle': 'Guía de Configuración de Google Play - Fast Testers | Configuración Completa para Desarrolladores',
  'seo.setupGuideDescription':
    'Guía completa para configurar tu cuenta de desarrollador de Google Play, configurar pruebas cerradas y preparar tu app para el requisito de 12 testers.',
  'seo.sampleAppTitle': 'App de Muestra - Fast Testers | Prueba Nuestra Experiencia de Demo',
  'seo.sampleAppDescription':
    'Prueba la app de muestra de Fast Testers para ver cómo funciona nuestro proceso de pruebas. Experimenta feedback real de testers, reportes de bugs y pruebas de cumplimiento de Google Play.',
  'seo.submitAppTitle': 'Envía Tu App - Fast Testers | Comienza Pruebas de Google Play Hoy',
  'seo.submitAppDescription':
    'Envía tu app Android para pruebas con Fast Testers. Obtén 12+ testers reales, recibe feedback detallado y logra acceso a producción.',
  'seo.partnersTitle': 'Socios - Fast Testers | Asóciate con Nosotros para Soluciones de Pruebas de Apps',
  'seo.partnersDescription':
    'Asóciate con Fast Testers para ofrecer servicios de pruebas de apps a tus clientes. Opciones de integración, programas de afiliados y soluciones co-branded disponibles.',
  'seo.statusTitle': 'Estado del Sistema - Fast Testers | Tiempo de Actividad y Rendimiento',
  'seo.statusDescription':
    'Consulta el estado del sistema de Fast Testers, monitoreo de tiempo de actividad y salud del servicio. Actualizaciones en tiempo real sobre disponibilidad y rendimiento.',
  'seo.changelogTitle': 'Registro de Cambios - Fast Testers | Actualizaciones y Nuevas Funciones',
  'seo.changelogDescription':
    'Mantente actualizado con cambios de la plataforma Fast Testers, nuevas funciones y mejoras. Ve nuestros últimos lanzamientos y próximas mejoras.',
  'seo.compareTitle': 'Comparar - Fast Testers vs Competidores | Comparación de Servicios de Pruebas',
  'seo.compareDescription':
    'Compara Fast Testers con otros servicios de pruebas de apps. Ve precios, velocidad, calidad de testers y funciones lado a lado. Ahorra hasta 80% con Fast Testers.',
  'seo.caseStudiesTitle': 'Casos de Estudio - Fast Testers | Historias de Éxito de Desarrolladores',
  'seo.caseStudiesDescription':
    'Lee historias reales de éxito de desarrolladores que lograron acceso a producción de Google Play usando Fast Testers. Ve métricas, plazos y resultados medibles.',
  'seo.cookiePolicyTitle': 'Política de Cookies - Fast Testers | Uso de Cookies y Consentimiento',
  'seo.cookiePolicyDescription':
    'Aprende cómo Fast Testers usa cookies, qué tipos utilizamos y cómo gestionar tus preferencias de cookies en nuestra plataforma de pruebas de apps.',
  'seo.loginTitle': 'Iniciar Sesión - Panel de Desarrollador Fast Testers',
  'seo.loginDescription':
    'Inicia sesión en tu cuenta de Fast Testers para gestionar pedidos de pruebas de apps y seguir el progreso de cumplimiento de Google Play.',
  'seo.signupTitle': 'Registrarse - Fast Testers | Crea Tu Cuenta de Desarrollador',
  'seo.signupDescription':
    'Crea una cuenta de Fast Testers para enviar apps para pruebas de 12 testers de Google Play y seguir el progreso de acceso a producción.',
  'seo.forgotPasswordTitle': 'Restablecer Contraseña - Fast Testers',
  'seo.forgotPasswordDescription':
    'Restablece la contraseña de tu cuenta Fast Testers para recuperar acceso a tu panel de pruebas de apps.',
};

const tr: SeoTranslationMap = {
  'seo.defaultTitle': 'Fast Testers - Google Play için 48 Saatte 12 Testçi Edinin',
  'seo.defaultDescription':
    'Fast Testers, Android geliştiricilerinin Google Play 12 testçi gereksinimini 48 saatte karşılamasına yardımcı olur. Gerçek testçiler, hızlı üretim erişimi ve garantili onay.',
  'seo.homeTitle': 'Fast Testers - Google Play için 48 Saatte 12 Testçi Edinin',
  'seo.homeDescription':
    'Google Play 12 testçi gereksinimini hızlıca karşılayın. Gerçek Android testçileri, 48 saatte üretim erişimi ve garantili onay. 1.500+ geliştiricinin güveni.',
  'seo.howItWorksTitle': 'Nasıl Çalışır - Fast Testers | 3 Adımlı Uygulama Test Süreci',
  'seo.howItWorksDescription':
    'Uygulamanızı gönderin, 12+ gerçek Android testçisiyle eşleştirin ve sadece 48 saatte Google Play üretim erişimi kazanın. Basit sürecimizi görün.',
  'seo.pricingTitle': 'Fiyatlandırma - Fast Testers | Google Play Uyumluluğu için $15/Uygulama',
  'seo.pricingDescription':
    'Uygulama başına $15 basit fiyatlandırma. 12+ gerçek testçi, 14 günlük test dönemi, detaylı raporlar ve garantili üretim erişimi.',
  'seo.faqTitle': 'SSS - Fast Testers | Google Play Testi Hakkında Sorular',
  'seo.faqDescription':
    'Google Play 12 testçi gereksinimi, test sürecimiz, fiyatlandırma ve üretim erişimini hızlıca nasıl alacağınız hakkında sık sorulan sorular.',
  'seo.aboutUsTitle': 'Hakkımızda - Fast Testers | Geliştiricilere Google Play Standartlarında Yardım',
  'seo.aboutUsDescription':
    'Fast Testers\'ın Android geliştiricilerine Google Play test gereksinimlerini karşılamada ve üretim erişimini hızlandırmada yardımcı olma misyonunu öğrenin.',
  'seo.reviewsTitle': 'Değerlendirmeler - Fast Testers | 1.500+ Android Geliştiricisinin Güveni',
  'seo.reviewsDescription':
    'Fast Testers kullanan geliştiricilerin doğrulanmış değerlendirmelerini okuyun. 1.500+ kullanıcıda ortalama 4.9/5 puan.',
  'seo.supportTitle': 'Destek Merkezi - Fast Testers | Uygulama Testi Yardım ve Kaynaklar',
  'seo.supportDescription':
    'Google Play test gereksinimleri hakkında yardım alın. Bilgi bankamıza göz atın, rehberlerimize bakın ve destek ekibimizle iletişime geçin.',
  'seo.contactTitle': 'Bize Ulaşın - Fast Testers | Uygulama Testi Yardımı İçin İletişime Geçin',
  'seo.contactDescription':
    'Google Play test gereksinimleri, hesap soruları veya ortaklık talepleri için Fast Testers ekibiyle iletişime geçin. 2 saat içinde yanıt veriyoruz.',
  'seo.feedbackTitle': 'Geri Bildirim - Fast Testers | Deneyiminizi ve Önerilerinizi Paylaşın',
  'seo.feedbackDescription':
    'Fast Testers hakkındaki geri bildiriminizi paylaşın. Uygulama test hizmetimizi geliştirmemize ve Google Play gereksinimlerini karşılamayı kolaylaştırmamıza yardımcı olun.',
  'seo.termsAndConditionsTitle': 'Şartlar ve Koşullar - Fast Testers | Hizmet Sözleşmesi',
  'seo.termsAndConditionsDescription':
    'Uygulama test hizmetimizi, kullanıcı sorumluluklarını, ödeme koşullarını ve Google Play uyumluluk hizmetlerini kapsayan Fast Testers şartlarını okuyun.',
  'seo.privacyPolicyTitle': 'Gizlilik Politikası - Fast Testers | Veri Koruma ve Gizlilik',
  'seo.privacyPolicyDescription':
    'Fast Testers\'ın verilerinizi nasıl işlediğini, gizliliğinizi nasıl koruduğunu ve uygulama test bilgilerinizin güvenliğini nasıl sağladığını öğrenin.',
  'seo.refundPolicyTitle': 'İade Politikası - Fast Testers | Para İade Garantisi',
  'seo.refundPolicyDescription':
    'Uygulamanız Google Play üretim erişimi elde edemezse Fast Testers tam iade sunar. Şeffaf iade politikamızı ve garanti koşullarını okuyun.',
  'seo.referralProgramTitle': 'Referans Programı - Fast Testers | Geliştirici Yönlendirerek Ödül Kazanın',
  'seo.referralProgramDescription':
    'Fast Testers referans programına katılın ve yönlendirdiğiniz her geliştirici için ödül kazanın. Başkalarının Google Play test gereksinimlerini karşılamasına yardımcı olun.',
  'seo.referralPolicyTitle': 'Referans Politikası - Fast Testers | Referans Programı Şartları',
  'seo.referralPolicyDescription':
    'Uygunluk, ödül yapısı, ödeme koşulları ve yeni geliştirici yönlendirme şartlarını kapsayan Fast Testers referans programı politikasını okuyun.',
  'seo.blogTitle': 'Blog - Fast Testers | Google Play Test Rehberleri ve Android İçgörüleri',
  'seo.blogDescription':
    'Google Play 12 testçi politikası, Android uygulama testi en iyi uygulamaları ve üretim erişimi ipuçları hakkında uzman rehberler.',
  'seo.publishAppGooglePlayTitle': 'Google Play\'de Uygulama Nasıl Yayınlanır - Fast Testers | Kapsamlı Rehber',
  'seo.publishAppGooglePlayDescription':
    'Android uygulamanızı Google Play\'de yayınlamak için adım adım rehber: 12 testçi gereksinimi, kapalı test ve üretim erişimi.',
  'seo.enterpriseOnboardingTitle': 'Kurumsal Onboarding Rehberi - Fast Testers | Toplu Uygulama Testi Kurulumu',
  'seo.enterpriseOnboardingDescription':
    'Birden fazla uygulamaya sahip ekipler için kapsamlı kurumsal onboarding rehberi. Toplu test kurulumu, testçi yönetimi ve Google Play uyumluluğunu öğrenin.',
  'seo.blog12TestersPolicyTitle': 'Google Play 12 Testçi Politikası Açıklandı - Fast Testers | Kapsamlı Rehber',
  'seo.blog12TestersPolicyDescription':
    'Google Play 12 testçi politikası hakkında bilmeniz gereken her şey: gereksinimler, zaman çizelgeleri, muafiyetler ve standardı hızlıca karşılama.',
  'seo.androidAppTestersTitle': 'Android Uygulama Testçileri - Fast Testers | Google Play Uyumluluğu için Gerçek Testçiler',
  'seo.androidAppTestersDescription':
    'Google Play 12 testçi gereksinimini karşılamanıza yardımcı olan gerçek Android uygulama testçileri edinin. Cihazlı profesyonel testçiler, geri bildirim ve 48 saat teslimat.',
  'seo.betaTestersGuideTitle': 'Android Uygulamaları için Beta Testçiler Nasıl Bulunur - Fast Testers | Uzman Rehber',
  'seo.betaTestersGuideDescription':
    'Beta testçi bulmakta zorlanıyor musunuz? Android beta testçileri bulmak ve Google Play 12 testçi gereksinimini hızlıca karşılamak için kanıtlanmış stratejiler öğrenin.',
  'seo.productionAccess12TestersTitle': '12 Testçi ile Google Play Üretim Erişimi - Fast Testers | Rehber',
  'seo.productionAccess12TestersDescription':
    '12 testçi gereksinimini karşılayarak Google Play üretim erişimi elde edin. Rehberimiz kapalı testten üretime geçişin tam adımlarını kapsar.',
  'seo.closedTestingTitle': 'Google Play Kapalı Test - Fast Testers | Kapsamlı Kapalı Test Rehberi',
  'seo.closedTestingDescription':
    'Kapsamlı rehberimizle Google Play kapalı testini öğrenin. Gereksinimler, kurulum adımları, testçi yönetimi ve üretim erişimine geçiş.',
  'seo.appRejectedTitle': 'Uygulamanız Google Play Tarafından Reddedildi mi? - Fast Testers | Redleri Hızlıca Düzeltin',
  'seo.appRejectedDescription':
    'Uygulamanız Google Play tarafından reddedildi mi? Yaygın reddetme nedenlerini öğrenin ve Fast Testers\'ın sorunları çözmenize ve onay almanıza nasıl yardımcı olduğunu görün.',
  'seo.multiLanguageTestingTitle': 'Çok Dilli Uygulama Testi - Fast Testers | Küresel Test Kapsamı',
  'seo.multiLanguageTestingDescription':
    'Android uygulamanızı birden fazla dil ve bölgede test edin. Fast Testers, dünya çapında Google Play uyumluluğu için çok dilli test sağlar.',
  'seo.setupGuideTitle': 'Google Play Kurulum Rehberi - Fast Testers | Kapsamlı Geliştirici Kurulumu',
  'seo.setupGuideDescription':
    'Google Play Geliştirici hesabınızı kurma, kapalı testi yapılandırma ve uygulamanızı 12 testçi gereksinimine hazırlama rehberi.',
  'seo.sampleAppTitle': 'Örnek Uygulama - Fast Testers | Demo Uygulama Test Deneyimimizi Deneyin',
  'seo.sampleAppDescription':
    'Test sürecimizin nasıl çalıştığını görmek için Fast Testers örnek uygulamasını deneyin. Gerçek testçi geri bildirimi, hata raporları ve Google Play uyumluluk testi.',
  'seo.submitAppTitle': 'Uygulamanızı Gönderin - Fast Testers | Google Play Testine Bugün Başlayın',
  'seo.submitAppDescription':
    'Android uygulamanızı Fast Testers ile test için gönderin. 12+ gerçek testçiyle eşleşin, detaylı geri bildirim alın ve üretim erişimi elde edin.',
  'seo.partnersTitle': 'Ortaklar - Fast Testers | Uygulama Test Çözümleri için Bizimle Ortak Olun',
  'seo.partnersDescription':
    'Müşterilerinize uygulama test hizmetleri sunmak için Fast Testers ile ortak olun. Entegrasyon seçenekleri, ortaklık programları ve ortak markalı çözümler.',
  'seo.statusTitle': 'Sistem Durumu - Fast Testers | Hizmet Çalışma Süresi ve Performans',
  'seo.statusDescription':
    'Fast Testers sistem durumunu, çalışma süresi izlemesini ve hizmet sağlığını kontrol edin. Platform kullanılabilirliği ve performansı hakkında gerçek zamanlı güncellemeler.',
  'seo.changelogTitle': 'Değişiklik Günlüğü - Fast Testers | Platform Güncellemeleri ve Yeni Özellikler',
  'seo.changelogDescription':
    'Fast Testers platform değişiklikleri, yeni özellikler ve iyileştirmelerle güncel kalın. Son sürümlerimizi ve yaklaşan geliştirmeleri görün.',
  'seo.compareTitle': 'Karşılaştır - Fast Testers vs Rakipler | Uygulama Test Hizmeti Karşılaştırması',
  'seo.compareDescription':
    'Fast Testers\'ı diğer uygulama test hizmetleriyle karşılaştırın. Fiyat, hız, testçi kalitesi ve özellikleri yan yana görün. Fast Testers ile %80\'e kadar tasarruf edin.',
  'seo.caseStudiesTitle': 'Vaka Çalışmaları - Fast Testers | Geliştirici Başarı Hikayeleri ve Sonuçlar',
  'seo.caseStudiesDescription':
    'Fast Testers kullanarak Google Play üretim erişimi elde eden geliştiricilerin gerçek başarı hikayelerini okuyun. Metrikler, zaman çizelgeleri ve ölçülebilir sonuçlar.',
  'seo.cookiePolicyTitle': 'Çerez Politikası - Fast Testers | Çerez Kullanımı ve Onay',
  'seo.cookiePolicyDescription':
    'Fast Testers\'ın çerezleri nasıl kullandığını, hangi türleri kullandığını ve uygulama test platformumuz için çerez tercihlerinizi nasıl yöneteceğinizi öğrenin.',
  'seo.loginTitle': 'Giriş - Fast Testers Geliştirici Paneli',
  'seo.loginDescription':
    'Uygulama test siparişlerini yönetmek ve Google Play uyumluluk ilerlemesini takip etmek için Fast Testers hesabınıza giriş yapın.',
  'seo.signupTitle': 'Kayıt Ol - Fast Testers | Geliştirici Hesabınızı Oluşturun',
  'seo.signupDescription':
    'Google Play 12 testçi testi için uygulama göndermek ve üretim erişimi ilerlemesini takip etmek için Fast Testers hesabı oluşturun.',
  'seo.forgotPasswordTitle': 'Şifre Sıfırla - Fast Testers',
  'seo.forgotPasswordDescription':
    'Uygulama test panelinize erişimi yeniden kazanmak için Fast Testers hesap şifrenizi sıfırlayın.',
};

const ar: SeoTranslationMap = {
  'seo.defaultTitle': 'فاست تسترز - احصل على 12 مختبر لـ Google Play في 48 ساعة',
  'seo.defaultDescription':
    'يساعد فاست تسترز مطوري أندرويد على تلبية متطلب 12 مختبر من Google Play في 48 ساعة. مختبرون حقيقيون، وصول سريع للإنتاج وموافقة مضمونة.',
  'seo.homeTitle': 'فاست تسترز - احصل على 12 مختبر لـ Google Play في 48 ساعة',
  'seo.homeDescription':
    'حقق متطلب 12 مختبر من Google Play بسرعة. مختبرو أندرويد حقيقيون، وصول للإنتاج في 48 ساعة وموافقة مضمونة. موثوق من أكثر من 1,500 مطور.',
  'seo.howItWorksTitle': 'كيف يعمل - فاست تسترز | عملية اختبار تطبيقات من 3 خطوات',
  'seo.howItWorksDescription':
    'أرسل تطبيقك، احصل على 12+ مختبر أندرويد حقيقي وحقق وصول الإنتاج في Google Play في 48 ساعة فقط. تعرف على عمليتنا البسيطة.',
  'seo.pricingTitle': 'الأسعار - فاست تسترز | اختبار تطبيقات بـ $15 لتوافق Google Play',
  'seo.pricingDescription':
    'أسعار بسيطة بـ $15 لكل تطبيق. 12+ مختبر حقيقي، فترة اختبار 14 يوماً، تقارير مفصلة ووصول للإنتاج مضمون.',
  'seo.faqTitle': 'الأسئلة الشائعة - فاست تسترز | أسئلة حول اختبار Google Play',
  'seo.faqDescription':
    'إجابات للأسئلة الشائعة حول متطلب 12 مختبر من Google Play، عملية الاختبار والأسعار وكيفية الحصول على وصول الإنتاج بسرعة.',
  'seo.aboutUsTitle': 'من نحن - فاست تسترز | مساعدة المطورين في تلبية معايير Google Play',
  'seo.aboutUsDescription':
    'تعرف على مهمة فاست تسترز في مساعدة مطوري أندرويد على التنقل في متطلبات اختبار Google Play وتحقيق وصول الإنتاج بشكل أسرع.',
  'seo.reviewsTitle': 'التقييمات - فاست تسترز | موثوق من 1,500+ مطور أندرويد',
  'seo.reviewsDescription':
    'اقرأ التقييمات الموثقة من المطورين الذين استخدموا فاست تسترز لتلبية متطلب 12 مختبر. متوسط تقييم 4.9/5 عبر أكثر من 1,500 مستخدم.',
  'seo.supportTitle': 'مركز الدعم - فاست تسترز | مساعدة وموارد اختبار التطبيقات',
  'seo.supportDescription':
    'احصل على مساعدة في متطلبات اختبار Google Play. تصفح قاعدة المعرفة والأدلة وتواصل مع فريق الدعم للحصول على مساعدة سريعة.',
  'seo.contactTitle': 'اتصل بنا - فاست تسترز | تواصل للحصول على مساعدة اختبار التطبيقات',
  'seo.contactDescription':
    'تواصل مع فريق فاست تسترز للحصول على مساعدة في متطلبات اختبار Google Play أو أسئلة الحساب أو استفسارات الشراكة. نرد خلال ساعتين.',
  'seo.feedbackTitle': 'التعليقات - فاست تسترز | شارك تجربتك واقتراحاتك',
  'seo.feedbackDescription':
    'شارك تعليقاتك حول فاست تسترز. ساعدنا في تحسين خدمة اختبار التطبيقات وتسهيل تلبية متطلبات Google Play للمطورين.',
  'seo.termsAndConditionsTitle': 'الشروط والأحكام - فاست تسترز | اتفاقية الخدمة',
  'seo.termsAndConditionsDescription':
    'اقرأ شروط وأحكام فاست تسترز التي تغطي خدمة اختبار التطبيقات ومسؤوليات المستخدم وشروط الدفع وخدمات توافق Google Play.',
  'seo.privacyPolicyTitle': 'سياسة الخصوصية - فاست تسترز | حماية البيانات والخصوصية',
  'seo.privacyPolicyDescription':
    'تعرف على كيفية تعامل فاست تسترز مع بياناتك وحماية خصوصيتك وضمان أمان معلومات اختبار التطبيقات والتفاصيل الشخصية.',
  'seo.refundPolicyTitle': 'سياسة الاسترداد - فاست تسترز | ضمان استرداد الأموال',
  'seo.refundPolicyDescription':
    'يقدم فاست تسترز استرداداً كاملاً إذا لم يحقق تطبيقك وصول الإنتاج في Google Play. اقرأ سياسة الاسترداد الشفافة وشروط الضمان.',
  'seo.referralProgramTitle': 'برنامج الإحالة - فاست تسترز | اكسب مكافآت لإحالة المطورين',
  'seo.referralProgramDescription':
    'انضم إلى برنامج إحالة فاست تسترز واكسب مكافآت عن كل مطور تحيله. ساعد الآخرين في تلبية متطلبات اختبار Google Play واحصل على أجر.',
  'seo.referralPolicyTitle': 'سياسة الإحالة - فاست تسترز | شروط برنامج الإحالة',
  'seo.referralPolicyDescription':
    'اقرأ سياسة برنامج إحالة فاست تسترز التي تغطي الأهلية وهيكل المكافآت وشروط الدفع وشروط إحالة مطورين جدد.',
  'seo.blogTitle': 'المدونة - فاست تسترز | أدلة اختبار Google Play ورؤى أندرويد',
  'seo.blogDescription':
    'أدلة خبراء حول سياسة 12 مختبر من Google Play وأفضل ممارسات اختبار تطبيقات أندرويد ونصائح الوصول للإنتاج.',
  'seo.publishAppGooglePlayTitle': 'كيفية نشر تطبيق على Google Play - فاست تسترز | دليل شامل',
  'seo.publishAppGooglePlayDescription':
    'دليل خطوة بخطوة لنشر تطبيق أندرويد على Google Play، بما في ذلك متطلب 12 مختبر والاختبار المغلق ووصول الإنتاج.',
  'seo.enterpriseOnboardingTitle': 'دليل الانضمام المؤسسي - فاست تسترز | إعداد اختبار التطبيقات بالجملة',
  'seo.enterpriseOnboardingDescription':
    'دليل انضمام مؤسسي شامل للفرق ذات التطبيقات المتعددة. تعلم إعداد الاختبار بالجملة وإدارة المختبرين وتبسيط توافق Google Play.',
  'seo.blog12TestersPolicyTitle': 'سياسة 12 مختبر من Google Play مفسرة - فاست تسترز | دليل شامل',
  'seo.blog12TestersPolicyDescription':
    'كل ما تحتاج معرفته عن سياسة 12 مختبر من Google Play: المتطلبات والجداول الزمنية والإعفاءات وكيفية تلبية المعيار بسرعة.',
  'seo.androidAppTestersTitle': 'مختبرو تطبيقات أندرويد - فاست تسترز | مختبرون حقيقيون لتوافق Google Play',
  'seo.androidAppTestersDescription':
    'احصل على مختبري تطبيقات أندرويد حقيقيين يساعدونك في تلبية متطلب 12 مختبر. مختبرون محترفون بأجهزة وملاحظات وتسليم خلال 48 ساعة.',
  'seo.betaTestersGuideTitle': 'كيفية إيجاد مختبري بيتا لتطبيقات أندرويد - فاست تسترز | دليل خبير',
  'seo.betaTestersGuideDescription':
    'تواجه صعوبة في إيجاد مختبري بيتا؟ تعلم استراتيجيات مثبتة لتوظيف مختبري بيتا أندرويد وتلبية متطلب 12 مختبر بسرعة وموثوقية.',
  'seo.productionAccess12TestersTitle': 'وصول الإنتاج في Google Play مع 12 مختبر - فاست تسترز | دليل',
  'seo.productionAccess12TestersDescription':
    'حقق وصول الإنتاج في Google Play بتلبية متطلب 12 مختبر. يغطي دليلنا الخطوات الدقيقة للانتقال من الاختبار المغلق إلى الإنتاج.',
  'seo.closedTestingTitle': 'الاختبار المغلق في Google Play - فاست تسترز | دليل شامل',
  'seo.closedTestingDescription':
    'أتقن الاختبار المغلق في Google Play مع دليلنا الشامل. تعلم المتطلبات وخطوات الإعداد وإدارة المختبرين والانتقال إلى وصول الإنتاج.',
  'seo.appRejectedTitle': 'تم رفض تطبيقك من Google Play؟ - فاست تسترز | أصلح الرفض بسرعة',
  'seo.appRejectedDescription':
    'تم رفض تطبيقك من Google Play؟ تعرف على أسباب الرفض الشائعة وكيف يساعدك فاست تسترز في حل المشاكل والحصول على موافقة الإنتاج.',
  'seo.multiLanguageTestingTitle': 'اختبار تطبيقات متعدد اللغات - فاست تسترز | تغطية اختبار عالمية',
  'seo.multiLanguageTestingDescription':
    'اختبر تطبيق أندرويد عبر لغات ومناطق متعددة. يوفر فاست تسترز اختباراً متعدد اللغات لضمان توافق Google Play عالمياً.',
  'seo.setupGuideTitle': 'دليل إعداد Google Play - فاست تسترز | إعداد شامل للمطورين',
  'seo.setupGuideDescription':
    'دليل شامل لإعداد حساب مطور Google Play وتكوين الاختبار المغلق وتحضير تطبيقك لمتطلب 12 مختبر.',
  'seo.sampleAppTitle': 'تطبيق تجريبي - فاست تسترز | جرب تجربة اختبار التطبيق التجريبية',
  'seo.sampleAppDescription':
    'جرب تطبيق فاست تسترز التجريبي لترى كيف تعمل عملية الاختبار. اختبر ملاحظات المختبرين الحقيقية وتقارير الأخطاء واختبار توافق Google Play.',
  'seo.submitAppTitle': 'أرسل تطبيقك - فاست تسترز | ابدأ اختبار Google Play اليوم',
  'seo.submitAppDescription':
    'أرسل تطبيق أندرويد للاختبار مع فاست تسترز. احصل على 12+ مختبر حقيقي وملاحظات مفصلة وحقق وصول الإنتاج.',
  'seo.partnersTitle': 'الشركاء - فاست تسترز | شاركنا حلول اختبار التطبيقات',
  'seo.partnersDescription':
    'شارك فاست تسترز لتقديم خدمات اختبار التطبيقات لعملائك. خيارات التكامل وبرامج الشراكة والحلول المشتركة متاحة.',
  'seo.statusTitle': 'حالة النظام - فاست تسترز | وقت التشغيل وأداء الخدمة',
  'seo.statusDescription':
    'تحقق من حالة نظام فاست تسترز ومراقبة وقت التشغيل وصحة الخدمة. تحديثات فورية عن توفر منصة اختبار التطبيقات وأدائها.',
  'seo.changelogTitle': 'سجل التغييرات - فاست تسترز | تحديثات المنصة والميزات الجديدة',
  'seo.changelogDescription':
    'ابقَ على اطلاع بتغييرات منصة فاست تسترز والميزات الجديدة والتحسينات. شاهد أحدث الإصدارات والتحسينات القادمة.',
  'seo.compareTitle': 'مقارنة - فاست تسترز مقابل المنافسين | مقارنة خدمات اختبار التطبيقات',
  'seo.compareDescription':
    'قارن فاست تسترز مع خدمات اختبار التطبيقات الأخرى. شاهد الأسعار والسرعة وجودة المختبرين والميزات جنباً إلى جنب. وفر حتى 80% مع فاست تسترز.',
  'seo.caseStudiesTitle': 'دراسات الحالة - فاست تسترز | قصص نجاح المطورين والنتائج',
  'seo.caseStudiesDescription':
    'اقرأ قصص نجاح حقيقية من مطورين حققوا وصول الإنتاج في Google Play باستخدام فاست تسترز. شاهد المقاييس والجداول الزمنية والنتائج القابلة للقياس.',
  'seo.cookiePolicyTitle': 'سياسة ملفات تعريف الارتباط - فاست تسترز | الاستخدام والموافقة',
  'seo.cookiePolicyDescription':
    'تعرف على كيفية استخدام فاست تسترز لملفات تعريف الارتباط وأنواعها وكيفية إدارة تفضيلاتك على منصة اختبار التطبيقات.',
  'seo.loginTitle': 'تسجيل الدخول - لوحة تحكم مطور فاست تسترز',
  'seo.loginDescription':
    'سجّل الدخول إلى حساب فاست تسترز لإدارة طلبات اختبار التطبيقات وتتبع تقدم توافق Google Play.',
  'seo.signupTitle': 'إنشاء حساب - فاست تسترز | أنشئ حساب المطور الخاص بك',
  'seo.signupDescription':
    'أنشئ حساب فاست تسترز لإرسال التطبيقات لاختبار 12 مختبر في Google Play وتتبع تقدم وصول الإنتاج.',
  'seo.forgotPasswordTitle': 'إعادة تعيين كلمة المرور - فاست تسترز',
  'seo.forgotPasswordDescription':
    'أعد تعيين كلمة مرور حساب فاست تسترز لاستعادة الوصول إلى لوحة اختبار التطبيقات.',
};

export const seoTranslations: Record<Language, SeoTranslationMap> = {
  en,
  es,
  tr,
  ar,
};
