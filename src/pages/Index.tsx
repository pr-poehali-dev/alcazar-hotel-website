import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { toast } from '@/components/ui/use-toast';

interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: string;
  image: string;
  amenities: string[];
}

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

const rooms: Room[] = [
  {
    id: 1,
    name: 'Стандартный номер',
    description: 'Уютный номер с видом на внутренний двор отеля',
    price: 5500,
    capacity: '1-2 человека',
    image: 'https://cdn.poehali.dev/projects/898d395e-c72c-48fa-bb3e-04d3650415ab/files/3daca134-c395-4d57-8989-7cb33cb735b2.jpg',
    amenities: ['Wi-Fi', 'Телевизор', 'Кондиционер', 'Мини-бар']
  },
  {
    id: 2,
    name: 'Комфорт',
    description: 'Роскошный номер с панорамными окнами и видом на башню',
    price: 12000,
    capacity: '2-3 человека',
    image: 'https://cdn.poehali.dev/projects/898d395e-c72c-48fa-bb3e-04d3650415ab/files/3daca134-c395-4d57-8989-7cb33cb735b2.jpg',
    amenities: ['Wi-Fi', 'Smart TV', 'Кондиционер', 'Мини-бар', 'Джакузи', 'Балкон']
  },
  {
    id: 3,
    name: 'Семейный',
    description: 'Эксклюзивные апартаменты на верхнем этаже башни',
    price: 25000,
    capacity: '4 человека',
    image: 'https://cdn.poehali.dev/projects/898d395e-c72c-48fa-bb3e-04d3650415ab/files/3daca134-c395-4d57-8989-7cb33cb735b2.jpg',
    amenities: ['Wi-Fi', 'Smart TV', 'Кондиционер', 'Бар', 'Джакузи', 'Терраса', 'Камин', 'Кухня']
  }
];

const reviews: Review[] = [
  {
    id: 1,
    author: 'Мария Петрова',
    rating: 5,
    text: 'Потрясающий отель! Сервис на высшем уровне, номера чистые и уютные. Вид из окна просто сказочный.',
    date: '15 октября 2024'
  },
  {
    id: 2,
    author: 'Дмитрий Иванов',
    rating: 5,
    text: 'Прекрасное место для отдыха. Персонал очень внимательный. Завтраки восхитительные!',
    date: '8 октября 2024'
  },
  {
    id: 3,
    author: 'Анна Соколова',
    rating: 4,
    text: 'Отличный отель с современным дизайном. Единственный минус - парковка небольшая.',
    date: '1 октября 2024'
  }
];

const services = [
  { icon: 'Wifi', title: 'Бесплатный Wi-Fi', description: 'Высокоскоростной интернет во всех номерах' },
  { icon: 'UtensilsCrossed', title: 'Ресторан', description: 'Изысканная кухня от шеф-повара' },
  { icon: 'Car', title: 'Парковка', description: 'Охраняемая парковка для гостей' },
  { icon: 'Dumbbell', title: 'Фитнес-центр', description: 'Современный тренажерный зал' },
  { icon: 'Waves', title: 'Бассейн', description: 'Крытый бассейн с подогревом' },
  { icon: 'Sparkles', title: 'SPA', description: 'Релаксация и оздоровительные процедуры' }
];

const galleryImages = [
  'https://cdn.poehali.dev/projects/898d395e-c72c-48fa-bb3e-04d3650415ab/files/2bb926eb-92ee-473c-8649-c3326a98f9a6.jpg',
  'https://cdn.poehali.dev/projects/898d395e-c72c-48fa-bb3e-04d3650415ab/files/3daca134-c395-4d57-8989-7cb33cb735b2.jpg',
  'https://cdn.poehali.dev/projects/898d395e-c72c-48fa-bb3e-04d3650415ab/files/2bb926eb-92ee-473c-8649-c3326a98f9a6.jpg',
  'https://cdn.poehali.dev/projects/898d395e-c72c-48fa-bb3e-04d3650415ab/files/3daca134-c395-4d57-8989-7cb33cb735b2.jpg'
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [selectedRoom, setSelectedRoom] = useState<number>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения бронирования.",
    });
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-heading font-bold text-primary">Алькасар</h1>
            <div className="hidden md:flex gap-6">
              {['home', 'rooms', 'services', 'gallery', 'about', 'reviews', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'rooms' && 'Номера'}
                  {section === 'services' && 'Услуги'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'about' && 'О отеле'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button onClick={() => scrollToSection('rooms')}>Забронировать</Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://cdn.poehali.dev/files/8607bf02-8b88-4c84-a740-90b9dee4aef1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-white animate-fade-in">
          <div className="max-w-3xl">
            <h2 className="text-6xl font-heading font-bold mb-6">Отель Алькасар</h2>
            <p className="text-2xl mb-8 text-white/90">Уютный отдых в замке с башней</p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => scrollToSection('rooms')} className="bg-white text-primary hover:bg-white/90">
                Посмотреть номера
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('contacts')} className="border-white text-white hover:bg-white/20">
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="rooms" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-heading font-bold mb-4">Наши номера</h2>
            <p className="text-lg text-muted-foreground">Выберите идеальный номер для вашего отдыха</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <Card key={room.id} className="overflow-hidden hover:shadow-xl transition-shadow animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative h-64 overflow-hidden">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="font-heading">{room.name}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Users" size={16} className="text-primary" />
                      <span>{room.capacity}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary">{amenity}</Badge>
                      ))}
                    </div>
                    <p className="text-2xl font-heading font-bold text-primary">{room.price.toLocaleString('ru-RU')} ₽ / ночь</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog open={isBookingOpen && selectedRoom === room.id} onOpenChange={(open) => {
                    setIsBookingOpen(open);
                    if (open) setSelectedRoom(room.id);
                  }}>
                    <DialogTrigger asChild>
                      <Button className="w-full">Забронировать</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle className="font-heading">Бронирование номера</DialogTitle>
                        <DialogDescription>
                          {room.name} - {room.price.toLocaleString('ru-RU')} ₽ / ночь
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleBooking} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Заезд</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left">
                                  <Icon name="Calendar" size={16} className="mr-2" />
                                  {checkIn ? format(checkIn, 'PP', { locale: ru }) : 'Выберите дату'}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-2">
                            <Label>Выезд</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left">
                                  <Icon name="Calendar" size={16} className="mr-2" />
                                  {checkOut ? format(checkOut, 'PP', { locale: ru }) : 'Выберите дату'}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя</Label>
                          <Input id="name" placeholder="Введите ваше имя" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Телефон</Label>
                          <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="your@email.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="comment">Комментарий</Label>
                          <Textarea id="comment" placeholder="Особые пожелания..." />
                        </div>
                        <Button type="submit" className="w-full">Отправить заявку</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Услуги отеля</h2>
            <p className="text-lg text-muted-foreground">Всё для вашего комфорта</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={service.title} className="text-center hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="font-heading">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Галерея</h2>
            <p className="text-lg text-muted-foreground">Взгляните на наш отель</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative h-80 overflow-hidden rounded-lg group cursor-pointer animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <img 
                  src={image} 
                  alt={`Галерея ${index + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-heading font-bold mb-6">О отеле Алькасар</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Отель Алькасар - это уникальное сочетание исторической архитектуры замка и современного комфорта. 
              Наш голубой двухэтажный замок с величественной трехэтажной башней стал символом роскоши и гостеприимства.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Мы предлагаем нашим гостям незабываемый отдых с безупречным сервисом, изысканной кухней и 
              широким спектром услуг для вашего комфорта и удовольствия.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <p className="text-4xl font-heading font-bold text-primary mb-2">18</p>
                <p className="text-muted-foreground">Номеров</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-heading font-bold text-primary mb-2">4</p>
                <p className="text-muted-foreground">Лет опыта</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-heading font-bold text-primary mb-2">10k+</p>
                <p className="text-muted-foreground">Довольных гостей</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Отзывы наших гостей</h2>
            <p className="text-lg text-muted-foreground">Что говорят о нас</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={review.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Star" 
                        size={16} 
                        className={i < review.rating ? 'text-accent fill-accent' : 'text-muted'} 
                      />
                    ))}
                  </div>
                  <CardTitle className="text-lg font-heading">{review.author}</CardTitle>
                  <CardDescription>{review.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold mb-4">Контакты</h2>
              <p className="text-lg text-muted-foreground">Свяжитесь с нами</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p className="text-muted-foreground">г. Москва, ул. Замковая, д. 1</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">info@alcazar-hotel.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-medium">Время работы</p>
                      <p className="text-muted-foreground">Круглосуточно</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Напишите нам</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Сообщение отправлено!",
                      description: "Мы ответим вам в ближайшее время.",
                    });
                  }}>
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Имя</Label>
                      <Input id="contact-name" placeholder="Ваше имя" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input id="contact-email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Сообщение</Label>
                      <Textarea id="contact-message" placeholder="Ваше сообщение..." required />
                    </div>
                    <Button type="submit" className="w-full">Отправить</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold mb-2">Отель Алькасар</h3>
            <p className="text-primary-foreground/80 mb-4">Роскошь и комфорт в современном замке</p>
            <div className="flex justify-center gap-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Icon name="Mail" size={20} />
              </Button>
            </div>
            <p className="text-primary-foreground/60 text-sm mt-6">© 2024 Отель Алькасар. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}